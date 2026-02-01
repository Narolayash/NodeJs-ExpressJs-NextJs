export default function Badge({ status, type = 'book' }) {
    const getStatusClass = () => {
        if (type === 'book') {
            return status === 'AVAILABLE' ? 'badge-success' : 'badge-danger';
        } else if (type === 'member') {
            return status === 'ACTIVE' ? 'badge-success' : 'badge-danger';
        } else if (type === 'issue') {
            return status === 'ISSUED' ? 'badge-warning' : 'badge-success';
        }
        return 'badge-info';
    };

    return (
        <span className={`badge ${getStatusClass()}`}>
            {status}
        </span>
    );
}
