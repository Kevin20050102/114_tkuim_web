import { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

// 請確認你的後端 Port 是 5001
const API_URL = 'http://localhost:5001/api/events';

function App() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(API_URL);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventAdded = (newEvent) => {
    setEvents([newEvent, ...events]);
  };

  const handleEventDeleted = (deletedId) => {
    setEvents(events.filter(event => event._id !== deletedId));
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* 標題區塊 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight sm:text-5xl drop-shadow-sm">
            🏫 校園活動管理系統
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            一站式管理系學會與社團大小事
          </p>
        </div>

        {/* 主要內容區塊：RWD 響應式排版 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* 左側：新增表單 (在電腦版會黏在上方) */}
          <div className="lg:col-span-1 lg:sticky lg:top-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
                <span className="text-2xl mr-2">✍️</span> 新增活動
              </h2>
              <EventForm API_URL={API_URL} onEventAdded={handleEventAdded} />
            </div>
          </div>

          {/* 右側：活動列表 */}
          <div className="lg:col-span-2">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">📅</span> 最新活動列表
                </h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  共 {events.length} 筆
                </span>
             </div>
            <EventList 
              events={events} 
              API_URL={API_URL} 
              onEventDeleted={handleEventDeleted} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;