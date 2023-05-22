export const StringResource = {
  close: "Fechar",
  serialNumber: "Número de Série",
  owner: "Portador",
  capacity: "Capacidade",
  refueled: "Abastecido",
  available: "Disponível",
  fuel: "Abastecer",
  run: "Rodar",
  appTitle: "Consumo Combustível",
  msgNoRecords: "Sem registros.",
  msgEnterWithTheNumberOfLiters: (action: string): string =>
    `Informe o numero de litros para ${action.toLocaleLowerCase()}.`,
};
