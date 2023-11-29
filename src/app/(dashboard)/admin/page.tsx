import DeleteEntregaForm from "@/components/form/deleteEntrega";
import NewEntregaForm from "@/components/form/newDriver";
import TodasEntregas from "@/components/todasEntregas";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";

const page = async () => {
	const session = await getServerSession(authOptions);

	let currentUser = session?.user.username;

	async function getEntregas(adm: string | undefined) {
		if (session) {
			const response = await db.entrega.findMany({
				where: { driverName: adm },
			});
			return response;
		} else {
			return null;
		}
	}

	const entregas = await getEntregas(currentUser);
	console.log(entregas);

	if (session?.user.role == "ADMIN") {
		return (
			<div className="flex mt-[100px] justify-evenly w-[100%] overflow-x-hidden">
				<div className="flex flex-col">
					<div className=" bg-slate-300 py-[40px] px-[30px] rounded-lg h-fit">
						<div className="flex justify-evenly items-center">
							<div>
								<h2 className="text-3xl font-bold mb-10">
									Criar Entrega
								</h2>
								<NewEntregaForm />
							</div>
						</div>
					</div>


				</div>
				<div className="flex flex-col">
					<div>
						<h3 className="text-3xl font-bold text-slate-800">
							Minhas Entregas
						</h3>
					</div>
					{entregas?.map((entrega, index) => (
						<div key={index}>
							<TodasEntregas
								key={entrega.id}
								entrega={entrega}
								session={session}
							/>
						</div>
					))}
				</div>
			</div>
		);
	} else {
		return (
			<h2 className="text-2xl">
				Ir para a
				<Link className="m-10 p-5 bg-red-600 rounded-md" href="/">
					Home
				</Link>
			</h2>
		);
	}
};

export default page;
