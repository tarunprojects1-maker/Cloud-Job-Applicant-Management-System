import {
  Briefcase,
  CheckCircle,
  Clock,
  Award,
  XCircle,
  Star,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

function DashboardCard({ stats }) {
  const statItems = [
    {
      key: "availableJobs",
      label: "Available Jobs",
      icon: Briefcase,
      value: stats?.availableJobs || 0,
      trend: "+12%",
      trendUp: true,
      color: "#2563EB",
      gradient: "linear-gradient(135deg,#2563EB,#4F46E5)",
      description: "Jobs currently available",
    },
    {
      key: "appliedJobs",
      label: "Applied Jobs",
      icon: CheckCircle,
      value: stats?.appliedJobs || 0,
      trend: "+8%",
      trendUp: true,
      color: "#22C55E",
      gradient: "linear-gradient(135deg,#22C55E,#16A34A)",
      description: "Applications submitted",
    },
    {
      key: "pending",
      label: "Pending",
      icon: Clock,
      value: stats?.pending || 0,
      trend: "-2%",
      trendUp: false,
      color: "#F59E0B",
      gradient: "linear-gradient(135deg,#F59E0B,#D97706)",
      description: "Waiting for response",
    },
    {
      key: "accepted",
      label: "Accepted",
      icon: Award,
      value: stats?.accepted || 0,
      trend: "+6%",
      trendUp: true,
      color: "#10B981",
      gradient: "linear-gradient(135deg,#10B981,#059669)",
      description: "Applications accepted",
    },
    {
      key: "rejected",
      label: "Rejected",
      icon: XCircle,
      value: stats?.rejected || 0,
      trend: "-4%",
      trendUp: false,
      color: "#EF4444",
      gradient: "linear-gradient(135deg,#EF4444,#DC2626)",
      description: "Applications rejected",
    },
    {
      key: "shortlisted",
      label: "Shortlisted",
      icon: Star,
      value: stats?.shortlisted || 0,
      trend: "+4%",
      trendUp: true,
      color: "#8B5CF6",
      gradient: "linear-gradient(135deg,#8B5CF6,#6D28D9)",
      description: "Shortlisted by recruiters",
    },
  ];

  return (
    <div className="stats-grid">
      {statItems.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.key} className="stat-card">
            <div className="stat-card-header">
              <div
                className="stat-icon-wrapper"
                style={{ background: item.gradient }}
              >
                <Icon size={20} color="white" />
              </div>

              <span
                className={`stat-trend ${
                  item.trendUp ? "up" : "down"
                }`}
              >
                {item.trend}
                {item.trendUp ? (
                  <TrendingUp size={12} />
                ) : (
                  <TrendingDown size={12} />
                )}
              </span>
            </div>

            <div className="stat-card-body">
              <span className="stat-label">{item.label}</span>

              <div className="stat-value-wrapper">
                <span className="stat-value">{item.value}</span>

                <div className="stat-sparkline">
                  <svg width="60" height="24" viewBox="0 0 60 24">
                    <polyline
                      points="0,20 10,15 20,18 30,8 40,12 50,4 60,8"
                      fill="none"
                      stroke={item.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              </div>

              <span className="stat-description">
                {item.description}
              </span>
            </div>

            <div
              className="stat-progress"
              style={{ background: item.color }}
            >
              <div
                className="stat-progress-bar"
                style={{
                  width: `${Math.min(
                    (item.value / 50) * 100,
                    100
                  )}%`,
                  background: item.gradient,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardCard;