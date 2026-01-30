import { useState } from 'react';

// 1. StepCounter компоненті - Дизайн осы жерде
function StepCounter({ initialValue = 0, step = 1 }) {
  const [count, setCount] = useState(initialValue);
  const [history, setHistory] = useState([]);
  const [operationCount, setOperationCount] = useState(0);

  const handleUpdate = (isIncrement) => {
    const newValue = isIncrement ? count + step : count - step;
    setCount(newValue);
    setHistory([newValue, ...history]);
    setOperationCount(prev => prev + 1);
  };

  const reset = () => {
    setCount(initialValue);
    setHistory([]);
    setOperationCount(0);
  };

  // Сен сұраған фиолетовый карта стилі
  const cardStyle = {
    background: 'linear-gradient(135deg, rgba(72, 12, 168, 0.85), rgba(114, 9, 183, 0.85))',
    backdropFilter: 'blur(15px)',
    color: 'white',
    padding: '30px',
    margin: '20px auto',
    borderRadius: '30px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  };

  const btnStyle = {
    background: '#c1e60d', // Сары-жасыл батырмалар
    color: '#000',
    border: 'none',
    padding: '12px 20px',
    margin: '8px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Сан: {count}</h2>
      <p style={{ opacity: 0.8 }}>Операциялар саны: {operationCount}</p>
      
      <div style={{ margin: '20px 0' }}>
        <button style={btnStyle} onClick={() => handleUpdate(true)}>Қосу (+{step})</button>
        <button style={btnStyle} onClick={() => handleUpdate(false)}>Алу (-{step})</button>
        <button style={{ ...btnStyle, background: '#f72585', color: 'white' }} onClick={reset}>Сброс</button>
      </div>

      <div style={{ 
        marginTop: '25px', 
        textAlign: 'left', 
        background: 'rgba(0,0,0,0.2)', 
        padding: '15px', 
        borderRadius: '15px' 
      }}>
        <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Тарих (соңғы 5):</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {history.length > 0 ? history.slice(0, 5).map((val, i) => (
            <span key={i} style={{ background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '8px' }}>
              {val}
            </span>
          )) : <span style={{ opacity: 0.5 }}>Әлі дерек жоқ</span>}
        </div>
      </div>
    </div>
  );
}

// 2. Негізгі App компоненті - Фондық сурет осы жерде
export default function App() {
  const fullScreenStyle = {
    // Фондық сурет және фиолетовый түс (егер сурет жүктелмесе)
    backgroundImage: 'url("/my-bg.jpg")',
    backgroundColor: '#1a1a2e',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 0',
    margin: 0,
    overflowX: 'hidden'
  };

  return (
    <div style={fullScreenStyle}>
      <h1 style={{ 
        color: 'white', 
        fontSize: '3rem', 
        textShadow: '4px 4px 10px rgba(0,0,0,0.7)',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        Лаборатория 3.1: Счётчик шагов
      </h1>
      
      {/* Бірінші есептегіш */}
      <StepCounter initialValue={0} step={1} />
      
      {/* Екінші есептегіш */}
      <StepCounter initialValue={10} step={5} />

      <p style={{ 
        color: 'white', 
        background: 'rgba(0,0,0,0.7)', 
        padding: '12px 25px', 
        borderRadius: '50px', 
        marginTop: '30px',
        fontSize: '0.9rem',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <i>Props — сырттан келетін деректер (read-only), ал State — компоненттің ішіндегі өзгеретін деректер.</i>
      </p>
    </div>
  );
}