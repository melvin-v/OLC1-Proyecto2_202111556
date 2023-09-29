import { useContext } from "react";
import { DataContext } from "../DataContext";
import './Tab.css';

function Tab() {
  const { data, activeTabIndex, setActiveTabIndex } = useContext(DataContext);

  const handleTabClick = (index) => {
    setActiveTabIndex(index);
  };

  const renderTabs = () => {
    return data.map((tab, index) => (
      <li key={index}>
        <a
          onClick={() => handleTabClick(index)}
          className={activeTabIndex === index ? 'nav-link active colorTabActive' : 'nav-link '}
          href='#'
          aria-current={activeTabIndex === index ? 'page' : undefined}
          style={{
            backgroundColor: activeTabIndex === index ? 'var(--color-primary)' : 'var(--color-secondary)',
            color: activeTabIndex === index ? '#ffff' : 'var(--color-text)',
          }}
        >
          {tab.nombre}
        </a>
      </li>
    ));
  };

  return <ul className="nav nav-tabs">{renderTabs()}</ul>;
}

export default Tab;
