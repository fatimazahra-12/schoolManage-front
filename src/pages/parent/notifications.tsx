import NotificationList from '../../components/notifications/NotificationList'

const ParentNotifications = () => {
	return (
		<div className="p-6">
			<NotificationList userType="parent" />
		</div>
	)
}

export default ParentNotifications
