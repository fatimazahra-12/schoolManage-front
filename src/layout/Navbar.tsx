import { useState } from 'react'

type NavbarProps = {
	onMenuClick: () => void
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
	const [profileOpen, setProfileOpen] = useState(false)
	const [notifOpen, setNotifOpen] = useState(false)

	const notifications = [
		{ title: 'New Enrollment', desc: 'Student #2547 enrolled in Grade 10', time: '2m ago' },
		{ title: 'Exam Scheduled', desc: 'Math final exam on Dec 20', time: '1h ago' },
		{ title: 'Staff Leave', desc: 'Mr. Smith submitted leave request', time: '3h ago' },
	]

	return (
		<header className="sticky top-0 z-50 border-b border-neutral-ivory bg-white/95 backdrop-blur">
			<div className="flex items-center justify-between px-4 py-3 sm:px-8">
				<div className="flex items-center gap-3">
					<button
						onClick={onMenuClick}
						className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-ivory text-teal-medium transition hover:border hover:border-coral hover:text-teal-deep"
						aria-label="Toggle sidebar"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" strokeWidth="1.5">
							<path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
						</svg>
					</button>

					<form className="relative hidden md:block" role="search">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4 text-teal-medium" strokeWidth="2">
								<circle cx="11" cy="11" r="8" />
								<path d="m21 21-4.35-4.35" strokeLinecap="round" />
							</svg>
						</div>
						<input
							type="search"
							placeholder="Search students, teachers..."
							className="w-64 rounded-full border border-neutral-ivory bg-neutral-sage py-2 pl-9 pr-12 text-sm text-teal-deep placeholder-teal-medium transition focus:border-coral focus:bg-white focus:outline-none focus:ring-2 focus:ring-coral-light"
							aria-label="Search"
						/>
						<button
							type="submit"
							className="absolute inset-y-0 right-1 inline-flex items-center justify-center rounded-full px-3 text-teal-medium hover:text-teal-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
							aria-label="Run search"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4" strokeWidth="2">
								<path d="m21 21-4.35-4.35" strokeLinecap="round" />
								<circle cx="11" cy="11" r="8" />
							</svg>
						</button>
					</form>
				</div>

				<div className="flex-1" />

				<div className="flex items-center gap-3 sm:gap-4">
					<button
						className="hidden h-10 w-10 items-center justify-center rounded-full border border-neutral-ivory text-teal-medium transition hover:border-coral hover:text-coral sm:inline-flex"
						aria-label="Chat"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" strokeWidth="1.5">
							<path d="M6 9h12M6 13h7" strokeLinecap="round" />
							<path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9l-4 3v-3H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
						</svg>
					</button>
					<div className="relative hidden sm:block">
						<button
							onClick={() => setNotifOpen((prev) => !prev)}
							className="h-10 w-10 items-center justify-center rounded-full border border-neutral-ivory text-teal-medium transition hover:border-coral hover:text-coral sm:inline-flex"
							aria-label="Notifications"
						>
							<span className="absolute right-1 top-1 inline-flex h-2.5 w-2.5 rounded-full bg-coral" />
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" strokeWidth="1.5">
								<path d="M12 4a4 4 0 0 0-4 4c0 4-1 5-2 6h12c-1-1-2-2-2-6a4 4 0 0 0-4-4z" />
								<path d="M10 19a2 2 0 0 0 4 0" />
							</svg>
						</button>
						{notifOpen && (
							<div className="absolute right-0 mt-2 w-80 rounded-xl border border-neutral-ivory bg-white shadow-xl">
								<div className="flex items-center justify-between px-4 py-3">
									<p className="text-sm font-semibold text-teal-deep">Notifications</p>
									<span className="rounded-full bg-coral-light px-2 py-1 text-[11px] font-semibold text-coral">{notifications.length} new</span>
								</div>
								<div className="divide-y divide-neutral-ivory">
									{notifications.map((note) => (
										<div key={note.title} className="flex items-start gap-3 px-4 py-3 hover:bg-neutral-sage">
											<div className="mt-1 h-2 w-2 rounded-full bg-coral" />
											<div className="flex-1">
												<p className="text-sm font-semibold text-teal-deep">{note.title}</p>
												<p className="text-xs text-teal-medium">{note.desc}</p>
											</div>
											<p className="text-[11px] font-semibold text-teal-medium">{note.time}</p>
										</div>
									))}
								</div>
								<button className="w-full rounded-b-xl px-4 py-3 text-center text-sm font-semibold text-coral hover:bg-neutral-sage">View all</button>
							</div>
						)}
					</div>
					<div className="relative">
						<button
							onClick={() => setProfileOpen((prev) => !prev)}
							className="flex items-center gap-3 rounded-full border border-neutral-ivory bg-white px-3 py-1.5 shadow-sm transition hover:border-coral"
						>
							<div className="h-8 w-8 rounded-full bg-[url('https://i.pravatar.cc/40')] bg-cover bg-center" />
							<div className="hidden text-left sm:block">
								<p className="text-xs text-teal-medium">Hi,</p>
								<p className="text-sm font-semibold text-teal-deep">Lakshay</p>
							</div>
						</button>
						{profileOpen && (
							<div className="absolute right-0 mt-2 w-48 rounded-xl border border-neutral-ivory bg-white shadow-lg">
								<div className="px-4 py-3 text-sm text-teal-medium">
									<p className="font-semibold text-teal-deep">Lakshay Dhoundiyal</p>
									<p className="text-xs text-teal-medium">info@company.com</p>
								</div>
								<div className="border-t border-neutral-ivory text-sm text-teal-deep">
									<button className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-neutral-sage">
										<span>👤</span>
										<span>Profile</span>
									</button>
									<button className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-neutral-sage">
										<span>⚙️</span>
										<span>Settings</span>
									</button>
									<button className="flex w-full items-center gap-2 px-4 py-3 text-left text-coral hover:bg-neutral-sage">
										<span>🚪</span>
										<span>Logout</span>
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

export default Navbar
