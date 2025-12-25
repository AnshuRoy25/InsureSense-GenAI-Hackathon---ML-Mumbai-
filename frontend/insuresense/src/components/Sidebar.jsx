import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#d32f2f" strokeWidth="2"/>
          <path d="M16 8v16M8 16h16" stroke="#d32f2f" strokeWidth="2"/>
        </svg>
      </div>
      <div className="sidebar-icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="6" y="6" width="20" height="20" rx="2" stroke="#a0a0a0" strokeWidth="2"/>
          <path d="M12 16h8M16 12v8" stroke="#a0a0a0" strokeWidth="2"/>
        </svg>
      </div>
      <div className="sidebar-icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="#a0a0a0" strokeWidth="2"/>
          <path d="M16 12v8M12 20l4-4 4 4" stroke="#a0a0a0" strokeWidth="2"/>
        </svg>
      </div>
    </aside>
  );
}

export default Sidebar;