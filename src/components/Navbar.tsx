import { authOptions } from "@/lib/auth";
import { Button, buttonVariants } from "./ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import UserAccountnav from "./UserAccountnav";

const Navbar = async () => {
	const session = await getServerSession(authOptions);
	return (
		<div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full h-[65px] z-10 top-0">
			<div className="container h-[50px] flex items-center justify-between">
				<Link href="/">
					<h1 className=" text-3xl text-center font-bold">TRANSHECK</h1>
				</Link>

				<div className="flex">

					<div className="mr-3 hidden">
						<Link className={buttonVariants()} href="/about">
							Sobre nós
						</Link>
					</div>

					{session?.user.role == "USER" ? (
						<div className="mr-3">
							<Link className={buttonVariants()} href="/rastrear">
								Rastrear Ecomenda
							</Link>
						</div>
					) : (
						<div className="hidden"></div>
					)}

					{session?.user.role == "ADMIN" ? (
						<div className="mr-3">
							<Link className={buttonVariants()} href="/admin">
								Nova Entrega
							</Link>
						</div>
					) : (
						<div className="hidden"></div>
					)}

					<div className=" flex justify-center font-bold items-center mr-5 ml-5 text-lg text-center h-[50px">
						{session?.user.username}
					</div>

					<div>
						{session?.user ? (
							<div>
								<UserAccountnav />
							</div>
						) : (
							<Link className={buttonVariants()} href="/sign-in">
								Entrar
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
