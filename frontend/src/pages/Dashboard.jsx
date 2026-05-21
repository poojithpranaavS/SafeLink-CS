import { useEffect, useState } from "react";

export default function Dashboard() {

  const [visitors, setVisitors] = useState([]);

  useEffect(() => {

    fetch("http://127.0.0.1:5000/api/visitors")

      .then((res) => res.json())

      .then((data) => {

        setVisitors(data);

      });

  }, []);

  return (

    <div className="min-h-screen bg-[#020617] text-white p-10">

      <h1 className="text-6xl font-black mb-12">

        Threat Intelligence Dashboard

      </h1>

      {/* TOP STATS */}

      <div className="grid grid-cols-4 gap-6 mb-14">

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">

          <p className="text-slate-400 mb-3">
            Total Visitors
          </p>

          <h2 className="text-5xl font-bold">
            {visitors.length}
          </h2>

        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">

          <p className="text-slate-400 mb-3">
            Active Sessions
          </p>

          <h2 className="text-5xl font-bold text-green-400">
            {visitors.length}
          </h2>

        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">

          <p className="text-slate-400 mb-3">
            VPN Detected
          </p>

          <h2 className="text-5xl font-bold text-yellow-400">
            0
          </h2>

        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">

          <p className="text-slate-400 mb-3">
            Threat Score
          </p>

          <h2 className="text-5xl font-bold text-red-400">
            Medium
          </h2>

        </div>

      </div>

      {/* TABLE */}

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

                  <td className="py-6">
                    {visitor.ip}
                  </td>

                  <td className="py-6">
                    {visitor.country || "Unknown"}
                  </td>

                  <td className="py-6">
                    {visitor.os}
                  </td>

                  <td className="py-6">
                    {visitor.browser}
                  </td>

                  <td className="py-6">
                    {visitor.device}
                  </td>

                  <td className="py-6 text-slate-400">
                    {visitor.time}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}