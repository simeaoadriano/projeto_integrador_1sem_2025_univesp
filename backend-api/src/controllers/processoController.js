const Processo = require("../models/Processo");

exports.create = async (req, res) => {
  try {
    const novoProcesso = new Processo(req.body);
    await novoProcesso.save();
    res.status(201).json(novoProcesso);
  } catch (err) {
    res.status(400).json({ msg: "Erro ao criar processo." });
  }
};

exports.getAll = async (req, res) => {
  try {
    // Paginação
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [processos, total] = await Promise.all([
      Processo.find().skip(skip).limit(limit).sort({ data_cadastro: -1 }),
      Processo.countDocuments()
    ]);

    res.json({ data: processos, total });
  } catch (err) {
    res.status(500).json({ msg: "Erro ao buscar processos." });
  }
};

exports.getById = async (req, res) => {
  try {
    const processo = await Processo.findById(req.params.id);
    res.json(processo);
  } catch (err) {
    res.status(404).json({ msg: "Processo não encontrado." });
  }
};

exports.update = async (req, res) => {
  try {
    const processo = await Processo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(processo);
  } catch (err) {
    res.status(400).json({ msg: "Erro ao atualizar processo." });
  }
};

exports.delete = async (req, res) => {
  try {
    await Processo.findByIdAndDelete(req.params.id);
    res.json({ msg: "Processo deletado com sucesso." });
  } catch (err) {
    res.status(400).json({ msg: "Erro ao deletar processo." });
  }
};
