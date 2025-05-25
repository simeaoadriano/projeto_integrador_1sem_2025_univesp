import streamlit as st
import pandas as pd
import requests
import altair as alt
import os

st.set_page_config(page_title="Dashboard de Processos", layout="wide")
st.title("Dashboard de Processos")

API_URL = "http://localhost:5000/api/processos"

# Tenta pegar o token do secrets, se existir o arquivo, senão pede ao usuário
token = None
secrets_path = os.path.join(os.path.dirname(__file__), ".streamlit", "secrets.toml")
if os.path.exists(secrets_path):
    try:
        token = st.secrets["api_token"]
    except Exception:
        pass

if not token:
    token = st.text_input("Token JWT", type="password")

if not token:
    st.warning("Informe o token JWT para acessar os dados.")
    st.stop()

headers = {"Authorization": token}
response = requests.get(API_URL, headers=headers)

if response.status_code != 200:
    st.error(f"Erro ao buscar dados da API. Código: {response.status_code}")
    st.stop()

data = response.json()
df = pd.DataFrame(data.get("data", []))

if df.empty:
    st.info("Nenhum dado encontrado.")
    st.stop()

# --- Tratamento de dados ---
df["data_cadastro"] = pd.to_datetime(df["data_cadastro"], errors="coerce")
df["estado"] = df["estado"].fillna("").replace("", "Não informado")
df["valor_honor"] = pd.to_numeric(df["valor_honor"], errors="coerce").fillna(0)

# Filtros interativos
estados = sorted(df["estado"].unique())
estado_sel = st.selectbox("Filtrar por estado", options=["Todos"] + estados)
if estado_sel != "Todos":
    df = df[df["estado"] == estado_sel]

# --- Gráfico 1: Número de processos por estado ---
st.subheader("Número de processos por estado")
df_estado = df.groupby("estado").size().reset_index(name="qtd_processos")
chart_estado = alt.Chart(df_estado).mark_bar().encode(
    x=alt.X("estado:N", title="Estado", sort="-y"),
    y=alt.Y("qtd_processos:Q", title="Quantidade de Processos"),
    tooltip=["estado", "qtd_processos"]
).properties(width=500, height=350)
st.altair_chart(chart_estado, use_container_width=True)

# --- Gráfico 2: Processos por mês ---
st.subheader("Quantidade de processos por mês")
df["mes"] = df["data_cadastro"].dt.to_period("M").astype(str)
df_mes = df.groupby("mes").size().reset_index(name="qtd_processos")
chart_mes = alt.Chart(df_mes).mark_line(point=True).encode(
    x=alt.X("mes:T", title="Mês"),
    y=alt.Y("qtd_processos:Q", title="Quantidade de Processos"),
    tooltip=["mes", "qtd_processos"]
).properties(width=700, height=350)
st.altair_chart(chart_mes, use_container_width=True)

# --- Gráfico 3: Honorários médios por estado ---
st.subheader("Valor médio de honorários por estado")
df_honor = df.groupby("estado")["valor_honor"].mean().reset_index()
chart_honor = alt.Chart(df_honor).mark_bar(color="#4f46e5").encode(
    x=alt.X("estado:N", title="Estado", sort="-y"),
    y=alt.Y("valor_honor:Q", title="Honorários Médios (R$)", scale=alt.Scale(zero=True)),
    tooltip=["estado", alt.Tooltip("valor_honor:Q", format=".2f")]
).properties(width=500, height=350)
st.altair_chart(chart_honor, use_container_width=True)
