import { useEffect, useState } from "react";

export default function Dashboard() {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/visitors")
      .then((res) => res.json())
      .then((data) => {
        setVisitors(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const browserStats = {};
  const deviceStats = {};
  const countryStats = {};
  const hourStats = {};

  visitors.forEach((v) => {
    const browser = v.browser || "Unknown";
    const device = v.device || "Unknown";
    const country = v.country || "Unknown";

    browserStats[browser] = (browserStats[browser] || 0) + 1;
    deviceStats[device] = (deviceStats[device] || 0) + 1;
    countryStats[country] = (countryStats[country] || 0) + 1;

    if (v.time) {
      const hour = v.time.split(" ")[1]?.split(":")[0];

      if (hour) {
        hourStats[hour] = (hourStats[hour] || 0) + 1;
      }
    }
  });

  const totalVisitors = visitors.length;

  const unknownVisitors = visitors.filter(
    (v) => !v.country || v.country === "Unknown" || !v.city
  ).length;

  const threatScore =
    totalVisitors === 0
      ? 0
      : Math.min(
          100,
          Math.round((unknownVisitors / totalVisitors) * 100)
        );

  let threatLevel = "Low";

  if (threatScore > 60) threatLevel = "High";
  else if (threatScore > 30) threatLevel = "Medium";

  let peakHour = "N/A";
  let peakCount = 0;

  Object.entries(hourStats).forEach(([hour, count]) => {
    if (count > peakCount) {
      peakCount = count;
      peakHour = `${hour}:00`;
    }
  });

  const todaysVisitors = visitors.filter((v) => {
    if (!v.time) return false;

    const today = new Date().toISOString().split("T")[0];

    return v.time.startsWith(today);
  }).length;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-10">

      <div className="flex justify-between items-center mb-12">

        <h1 className="text-6xl font-black">
          Threat Intelligence Dashboard
        </h1>

        <a
          href="http://127.0.0.1:5000/export-csv"
          target="_blank"
          rel="noreferrer"
        >
          <button className="px-6 py-4 rounded-2xl bg-green-600 hover:bg-green-500 transition-all font-bold text-lg shadow-lg">
            📊 Download CSV Report
          </button>
        </a>

      </div>

      <div className="grid grid-cols-4 gap-6 mb-14">

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <p className="text-slate-400 mb-3">Total Visitors</p>
          <h2 className="text-5xl font-bold">{totalVisitors}</h2>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <p className="text-slate-400 mb-3">Visitors Today</p>
          <h2 className="text-5xl font-bold text-green-400">
            {todaysVisitors}
          </h2>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <p className="text-slate-400 mb-3">Suspicious Visitors</p>
          <h2 className="text-5xl font-bold text-yellow-400">
            {unknownVisitors}
          </h2>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <p className="text-slate-400 mb-3">Threat Score</p>
          <h2 className="text-5xl font-bold text-red-400">
            {threatLevel}
          </h2>
          <p className="text-slate-400 mt-2">{threatScore}/100</p>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-6 mb-12">

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <h2 className="text-2xl font-bold mb-4">
            Peak Activity Analysis
          </h2>

          <p className="text-slate-400">Most Active Hour</p>

          <h1 className="text-5xl font-bold text-cyan-400 mt-2">
            {peakHour}
          </h1>

          <p className="mt-4 text-slate-400">
            Visitors During Peak Hour: {peakCount}
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <h2 className="text-2xl font-bold mb-4">
            Risk Prediction
          </h2>

          <p className="text-slate-400">
            Calculated Threat Score
          </p>

          <h1 className="text-5xl font-bold text-red-400 mt-2">
            {threatScore}
          </h1>

          <p className="mt-4 text-slate-400">
            Classification: {threatLevel}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-3 gap-6 mb-12">

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">

          <h2 className="text-2xl font-bold mb-6">
            Browser Analytics
          </h2>

          {Object.entries(browserStats).map(([browser, count]) => {

            const percentage =
              totalVisitors === 0
                ? 0
                : ((count / totalVisitors) * 100).toFixed(1);

            return (
              <div
                key={browser}
                className="flex justify-between py-2 border-b border-white/5"
              >
                <span>{browser}</span>

                <span className="text-cyan-400">
                  {count} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">

          <h2 className="text-2xl font-bold mb-6">
            Device Analytics
          </h2>

          {Object.entries(deviceStats).map(([device, count]) => {

            const percentage =
              totalVisitors === 0
                ? 0
                : ((count / totalVisitors) * 100).toFixed(1);

            return (
              <div
                key={device}
                className="flex justify-between py-2 border-b border-white/5"
              >
                <span>{device}</span>

                <span className="text-green-400">
                  {count} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">

          <h2 className="text-2xl font-bold mb-6">
            Country Analytics
          </h2>

          {Object.entries(countryStats).map(([country, count]) => {

            const percentage =
              totalVisitors === 0
                ? 0
                : ((count / totalVisitors) * 100).toFixed(1);

            return (
              <div
                key={country}
                className="flex justify-between py-2 border-b border-white/5"
              >
                <span>{country}</span>

                <span className="text-yellow-400">
                  {count} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>

      </div>

      <div className="rounded-[40px] border border-white/10 bg-white/5 p-10">

        <h2 className="text-4xl font-bold mb-10">
          Live Visitor Logs
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="text-left text-slate-400 border-b border-white/10">
                <th className="pb-5">IP Address</th>
                <th className="pb-5">Country</th>
                <th className="pb-5">OS</th>
                <th className="pb-5">Browser</th>
                <th className="pb-5">Device</th>
                <th className="pb-5">Time</th>
              </tr>
            </thead>

            <tbody>

              {visitors.map((visitor, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition-all"
                >
                  <td className="py-6">{visitor.ip}</td>
                  <td className="py-6">{visitor.country || "Unknown"}</td>
                  <td className="py-6">{visitor.os}</td>
                  <td className="py-6">{visitor.browser}</td>
                  <td className="py-6">{visitor.device}</td>
                  <td className="py-6 text-slate-400">{visitor.time}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
