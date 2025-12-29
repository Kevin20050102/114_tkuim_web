import axios from 'axios';

function EventList({ events, API_URL, onEventDeleted }) {
  const handleDelete = async (id) => {
    if (window.confirm('確定要刪除這個活動嗎？')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        onEventDeleted(id);
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('刪除失敗');
      }
    }
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-xl font-medium text-gray-500">目前沒有任何活動</p>
        <p className="text-gray-400 text-sm mt-2">快去左邊新增第一個活動吧！</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
      {events.map(event => (
        <div key={event._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col transform hover:-translate-y-1">
          {/* 卡片頂部色條 */}
          <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
          
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                {event.title}
              </h3>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 whitespace-nowrap ml-2">
                {event.organizer}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600 flex-1 mb-4">
              <div className="flex items-center text-gray-500">
                <span className="mr-2 text-lg">🗓️</span>
                <span className="font-medium text-gray-700 bg-gray-50 px-2 py-0.5 rounded">
                  {event.date ? new Date(event.date).toLocaleDateString() : '未定日期'}
                </span>
              </div>
              <div className="flex items-center text-gray-500">
                <span className="mr-2 text-lg">📍</span>
                <span>{event.location}</span>
              </div>
              {event.description && (
                <p className="text-gray-500 mt-3 pt-3 border-t border-gray-50 text-sm leading-relaxed">
                  {event.description}
                </p>
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => handleDelete(event._id)}
                className="text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors duration-200 flex items-center opacity-80 hover:opacity-100"
              >
                <span className="mr-1.5">🗑️</span> 刪除
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventList;