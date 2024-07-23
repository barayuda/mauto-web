import Link from "next/link";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";

import { authRoutes, themes } from "../utils/constants";
import { Dispatch, RootState } from "../store/store";
import { useAuthenticatedSocket } from "../utils/useSocket";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
	useAuthenticatedSocket("ws://localhost:4000/chat");
	const { theme, setTheme } = useTheme();
	const router = useRouter();
	const dispatch = useDispatch<Dispatch>();
	const { user, authenticated } = useSelector(
		(state: RootState) => state.user
	);

	const thisRoute = authRoutes.includes(router.pathname);

	const logout = async () => {
		try {
			if (thisRoute) {
				router.back();
			}
			dispatch.user.logoutAsync();
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<nav className="sticky top-0 z-50 shadow-2xl bg-base-300 navbar">
				<div className="navbar-start">
					<div className="dropdown">
						<label tabIndex={0} className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-5 h-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
						>
							{user && authenticated ? (
								<>
									<li>
										<Link
											href="/me"
											className="btn btn-ghost btn-sm rounded-btn"
										>
											Me
										</Link>
									</li>
									<li>
										<button
											className="btn btn-ghost btn-sm rounded-btn"
											onClick={logout}
										>
											Logout
										</button>
									</li>
									<li>
										<Link
											href="/chat"
											className="btn btn-ghost btn-sm rounded-btn"
										>
											Chats
										</Link>
									</li>
								</>
							) : (
								<>
									<li>
										<Link
											href="/login"
											className="btn btn-ghost btn-sm rounded-btn"
										>
											Sign in/Sign up
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
					<div className="flex-none px-2 mx-2">
						<Link className="text-lg font-bold" href="/">
							M-Auto
						</Link>
					</div>
					<div className="hidden lg:flex-none lg:flex">
						<ul className="p-0 menu menu-horizontal">
							{user && authenticated ? (
								<>
									<li>
										<Link href="/me">Me</Link>
									</li>
									<li>
										<button onClick={logout}>Logout</button>
									</li>
									<li>
										<Link href="/chat">Chats</Link>
									</li>
								</>
							) : (
								<>
									<li>
										<Link href="/login">
											Sign in/Sign up
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
				<div className="navbar-end">
					<div className="flex-none">
						<div className="dropdown">
							<div tabIndex={0} role="button" className="btn m-1">
							Theme
							<svg
								width="12px"
								height="12px"
								className="inline-block h-2 w-2 fill-current opacity-60"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 2048 2048">
								<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
							</svg>
							</div>
							<ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl">
							{
								themes.map((theme, index) => (
								<li key={index} onClick={() => setTheme(theme.name.toLowerCase())}>
									<input
									type="radio"
									name="theme-dropdown"
									class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
									aria-label={theme.name}
									value={theme.name} />
								</li>
								))
							}
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};
