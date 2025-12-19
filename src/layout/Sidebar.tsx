import { useEffect, useState } from 'react'

type SidebarProps = {
	open: boolean
}

const sections = [
	{
		title: 'Dashboard',
		items: [{ label: 'Overview', icon: 'dashboard', path: '/' }],
	},
	{
		title: 'Management',
		items: [
			{ label: 'Students', icon: 'students', path: '/etudiant' },
			{ label: 'Teachers', icon: 'teachers', path: '/enseignant' },
			{ label: 'Parents', icon: 'parents', path: '/parent' },
			{ label: 'Staff', icon: 'staff', path: '/staff' },
		],
	},
	{
		title: 'Academic',
		items: [
			{ label: 'Classes', icon: 'classes', path: '/classes' },
			{ label: 'Subjects', icon: 'subjects', path: '/subjects' },
			{ label: 'Timetable', icon: 'timetable', path: '/timetable' },
			{ label: 'Exams', icon: 'exams', path: '/exams' },
			{ label: 'Results', icon: 'results', path: '/results' },
		],
	},
	{
		title: 'Activities',
		items: [
			{ label: 'Attendance', icon: 'attendance', path: '/attendance' },
			{ label: 'Assignments', icon: 'assignments', path: '/assignments' },
			{ label: 'Events', icon: 'events', path: '/events' },
			{ label: 'Library', icon: 'library', path: '/library' },
		],
	},
]

const iconMap: Record<string, React.ReactElement> = {
	dashboard: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
			<rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="1.5" />
			<rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="1.5" />
			<rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="1.5" />
			<rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="1.5" />
		</svg>
	),
	students: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
			<path d="M12 6L4 10l8 4 8-4-8-4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M4 10v6l8 4 8-4v-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	teachers: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
			<circle cx="12" cy="8" r="3" strokeWidth="1.5" />
			<path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" strokeWidth="1.5" />
			<path d="M19 8h2M19 12h2" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	),
	parents: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
			<circle cx="9" cy="7" r="2.5" strokeWidth="1.5" />
			<circle cx="15" cy="7" r="2.5" strokeWidth="1.5" />
			<path d="M4 18c0-2.5 2-4 5-4s5 1.5 5 4" strokeWidth="1.5" />
			<path d="M10 18c0-2.5 2-4 5-4s5 1.5 5 4" strokeWidth="1.5" />
		</svg>
	),
	staff: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
			<circle cx="9" cy="8" r="3" strokeWidth="1.5" />
			<path d="M15 12c1.657 0 3-1.343 3-3s-1.343-3-3-3" strokeWidth="1.5" />
			<path d="M4 18c0-2.5 2-4.5 4.5-4.5S13 15.5 13 18" strokeWidth="1.5" />
			<path d="M15 14.5c2.5 0 4.5 2 4.5 4.5" strokeWidth="1.5" />
		</svg>
	),
	classes: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
			<rect x="3" y="6" width="18" height="13" rx="2" strokeWidth="1.5" />
			<path d="M3 10h18M8 6v4M16 6v4" strokeWidth="1.5" />
		</svg>
	),
	subjects: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
			<path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" strokeWidth="1.5" />
			<path d="M8 9h8M8 13h5" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	),
	timetable: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
			<rect x="4" y="5" width="16" height="15" rx="2" strokeWidth="1.5" />
			<path d="M8 3v4M16 3v4M4 10h16" strokeWidth="1.5" />
			<path d="M8 14h2M14 14h2M8 17h2" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	),
	exams: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
			<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="1.5" />
			<path d="M14 2v6h6M9 15l2 2 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	results: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
			<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="1.5" />
			<path d="M14 2v6h6M10 13h4M10 17h4M10 9h1" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	),
	attendance: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
			<path d="M9 11l3 3L22 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeWidth="1.5" />
		</svg>
	),
	assignments: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
			<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="1.5" />
			<path d="M14 2v6h6M12 18v-6M9 15l3-3 3 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	events: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
			<rect x="4" y="5" width="16" height="15" rx="2" strokeWidth="1.5" />
			<path d="M8 3v4M16 3v4M4 10h16M9 14h6M9 17h4" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	),
	library: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
			<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeWidth="1.5" />
			<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeWidth="1.5" />
			<path d="M8 7h8M8 11h8" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	),
}

const Sidebar = ({ open }: SidebarProps) => {
	const [isDark, setIsDark] = useState(false)

	const applyTheme = (nextDark: boolean) => {
		setIsDark(nextDark)
		if (typeof document !== 'undefined') {
			document.body.classList.toggle('dark-mode', nextDark)
		}
		localStorage.setItem('theme', nextDark ? 'dark' : 'light')
	}

	useEffect(() => {
		const stored = localStorage.getItem('theme')
		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
		const initialDark = stored ? stored === 'dark' : prefersDark
		applyTheme(initialDark)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const toggleTheme = () => applyTheme(!isDark)

	return (
		<>
			<aside
				className={`app-sidebar fixed inset-y-0 left-0 z-40 flex flex-col border-r border-neutral-ivory bg-white shadow-sm transition-all duration-300 ease-out ${
					open ? 'translate-x-0 w-64 md:w-64 md:translate-x-0' : '-translate-x-full w-64 md:translate-x-0 md:w-20'
				}`}
			>
	<div className={`flex items-center py-4 border-b border-neutral-ivory ${open ? 'px-5' : 'justify-center px-2'}`}>
				{open ? (
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral text-white text-sm font-bold">S</div>
						<div>
							<p className="text-xs font-semibold text-teal-medium">School</p>
							<p className="text-sm font-bold font-serif text-teal-deep">Management</p>
						</div>
					</div>
				) : (
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral text-white text-sm font-bold">S</div>
				)}
				</div>

				<nav className="flex-1 overflow-y-auto space-y-7 px-4 py-6 pb-8">
					{sections.map((section) => (
						<div key={section.title} className="space-y-3">
							{open && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-medium">{section.title}</p>}
							<div className="space-y-1">
								{section.items.map((item) => (
									<button
										key={item.label}
										className={`flex w-full items-center ${open ? 'gap-3 px-3' : 'justify-center px-2'} rounded-lg py-2.5 text-sm font-medium transition text-teal-medium hover:bg-neutral-ivory hover:text-teal-deep`}
										title={!open ? item.label : undefined}
									>
										<span className="text-teal-medium">{iconMap[item.icon]}</span>
										{open && <span>{item.label}</span>}
									</button>
								))}
							</div>
						</div>
					))}
				</nav>

				{/* Theme Toggle Button */}
				<div className="border-t border-neutral-ivory px-4 py-4">
					<button
						onClick={toggleTheme}
						className={`flex w-full items-center ${open ? 'gap-3 px-3' : 'justify-center px-2'} rounded-lg py-2.5 text-sm font-medium transition text-teal-medium hover:bg-neutral-ivory hover:text-teal-deep`}
						title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
					>
						<span className="text-teal-medium">
							{isDark ? (
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
									<circle cx="12" cy="12" r="4" strokeWidth="1.5" />
									<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeWidth="1.5" strokeLinecap="round" />
								</svg>
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
									<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							)}
						</span>
						{open && <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
					</button>
				</div>
			</aside>
		</>
	)
}

export default Sidebar
