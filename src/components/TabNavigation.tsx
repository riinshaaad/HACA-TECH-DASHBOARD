"use client";

interface TabNavigationProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

const tabs = [
  {
    id: 0,
    label: "Interactive Dashboard",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 1,
    label: "Lead & Competitor Analysis",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    id: 2,
    label: "Competitor Strategy",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    id: 3,
    label: "Marketing Strategy",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
];

export default function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="flex gap-1 rounded-2xl bg-surface p-1.5 border border-border" id="tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-accent-primary/20 to-accent-primary-hover/20 text-text-primary shadow-lg"
                : "text-text-muted hover:bg-surface-hover hover:text-text-secondary"
            }`}
          >
            <span
              className={
                activeTab === tab.id
                  ? "text-accent-primary"
                  : "text-text-muted"
              }
            >
              {tab.icon}
            </span>
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">
              {tab.id === 0
                ? "Dashboard"
                : tab.id === 1
                ? "Insights"
                : tab.id === 2
                ? "Competitor"
                : "Marketing"}
            </span>
            {activeTab === tab.id && (
              <span className="tab-indicator absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-primary to-accent-primary-hover" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
