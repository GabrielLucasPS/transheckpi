import { db } from "./db";

export default {
	RastrearByNome: async (nomeCliente: string) => {
		let entregas = await db.entrega.findMany({
			where: {
				clientName: nomeCliente,
			},
		});

		return entregas;
	},
};
