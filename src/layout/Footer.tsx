const Footer = () => {
	return (
		<footer className="app-footer border-t border-neutral-ivory bg-white px-4 py-4 sm:px-8">
			<div className="flex flex-col gap-2 text-xs text-teal-medium sm:flex-row sm:items-center sm:justify-between">
				<p>School Management System © 2025 • Empowering Education</p>
				<div className="flex items-center gap-4">
					<a className="hover:text-coral" href="#">Privacy</a>
					<a className="hover:text-coral" href="#">Terms</a>
					<a className="hover:text-coral" href="#">Support</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer
