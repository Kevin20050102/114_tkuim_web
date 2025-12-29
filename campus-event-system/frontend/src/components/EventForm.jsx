import { useState } from 'react';
import axios from 'axios';

function EventForm({ API_URL, onEventAdded }) {
  const [event, setEvent] = useState({
    title: '',
    date: '',
    location: '',
    organizer: '',
    description: ''
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, event);
      onEventAdded(response.data.data);
      // 清空表單
      setEvent({ title: '', date: '', location: '', organizer: '', description: '' });
    } catch (error) {
      console.error('Error adding event:', error);
      alert('新增失敗，請檢查欄位或後端連線');
    }
  };

  // 定義通用的輸入框樣式
  const inputClass = "mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border transition duration-200 bg-gray-50 focus:bg-white";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className={labelClass}>活動名稱 <span className="text-red-500">*</span></label>
        <input type="text" name="title" id="title" value={event.title} onChange={handleChange} required className={inputClass} placeholder="例如：期末歌唱大賽" />
      </div>
      <div>
        <label htmlFor="date" className={labelClass}>日期 <span className="text-red-500">*</span></label>
        <input type="date" name="date" id="date" value={event.date} onChange={handleChange} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="location" className={labelClass}>地點 <span className="text-red-500">*</span></label>
        <input type="text" name="location" id="location" value={event.location} onChange={handleChange} required className={inputClass} placeholder="例如：學生活動中心" />
      </div>
      <div>
        <label htmlFor="organizer" className={labelClass}>主辦單位 <span className="text-red-500">*</span></label>
        <input type="text" name="organizer" id="organizer" value={event.organizer} onChange={handleChange} required className={inputClass} placeholder="例如：資管系學會" />
      </div>
      <div>
        <label htmlFor="description" className={labelClass}>活動詳情</label>
        <textarea name="description" id="description" value={event.description} onChange={handleChange} rows="3" className={inputClass} placeholder="更多活動資訊..."></textarea>
      </div>
      <button type="submit" className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02]">
        ✨ 發布活動
      </button>
    </form>
  );
}

export default EventForm;