import React from 'react';
import {
  X,
  Award,
  TrendingUp,
  Shield,
  HelpCircle,
  Users,
  CheckCircle,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';
import { computeAllIndiaRanking } from '../utils/adaptiveEngine';

export const LeaderboardModal: React.FC = () => {
  const { user } = useAuth();
  const { isLeaderboardOpen, setLeaderboardOpen, progress } = useLearning();

  if (!isLeaderboardOpen) return null;

  const rankingInfo = computeAllIndiaRanking(
    user?.normalizedScore || 84.5,
    progress.quizSessions.length + 3,
    user?.modeOfStudy || 'moderate'
  );

  const MOCK_LEADERBOARD = [
    { rank: 1, name: 'Dr. Anita Roy', cadre: 'ISS / MoSPI Hq (New Delhi)', mode: 'expert', baseline: 'expert', score: 99.2 },
    { rank: 2, name: 'Shri Vikramaditya Joshi', cadre: 'CSO National Accounts Div', mode: 'expert', baseline: 'expert', score: 98.8 },
    { rank: 3, name: 'Ms. Priyadarshini Rao', cadre: 'RBI Department of Statistics', mode: 'expert', baseline: 'hard', score: 98.5 },
    {
      rank: user?.allIndiaRank || 412,
      name: `${user?.aadhaarName || 'Dr. Rajesh Kumar Sharma'} (You)`,
      cadre: user?.organization || 'Central Statistics Office, MoSPI',
      mode: user?.modeOfStudy || 'moderate',
      baseline: progress.calibratedBaselineDifficulty || 'moderate',
      score: user?.normalizedScore || 84.5,
      isCurrentUser: true,
    },
    { rank: 413, name: 'Shri K. Ramanathan', cadre: 'DES Tamil Nadu / State Cadre', mode: 'moderate', baseline: 'moderate', score: 84.2 },
    { rank: 414, name: 'Dr. Sanjeev Mohanty', cadre: 'NSSO Field Operations (Bhubaneswar)', mode: 'moderate', baseline: 'moderate', score: 83.9 },
    { rank: 820, name: 'Ms. Kavita Deshmukh', cadre: 'DES Maharashtra (Mumbai)', mode: 'beginner', baseline: 'moderate', score: 79.1 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col">
        {/* Tricolor */}
        <div className="tricolor-strip rounded-t-2xl" />

        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy-950">
                All-India Statistical Cadre Leaderboard
              </h3>
              <p className="text-xs text-slate-500">
                Performance Normalization & National Ranking Engine
              </p>
            </div>
          </div>
          <button
            onClick={() => setLeaderboardOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1">
          {/* User's Ranking Card */}
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 text-white rounded-2xl p-5 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-saffron-500 text-white">
                  {rankingInfo.designationTier}
                </span>
                <h4 className="text-lg font-bold text-white mt-1">
                  {user?.aadhaarName || 'Dr. Rajesh Kumar Sharma'}
                </h4>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  Cadre ID: {user?.govtId || 'IOSS-2024-ISS-089'}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[11px] text-slate-400">All-India Rank</div>
                  <div className="text-2xl font-black text-amber-400">
                    #{rankingInfo.rank}
                  </div>
                  <div className="text-[10px] text-slate-400">of {rankingInfo.cadreTotal.toLocaleString()} officers</div>
                </div>
                <div className="h-10 w-px bg-white/20" />
                <div className="text-right">
                  <div className="text-[11px] text-slate-400">Percentile</div>
                  <div className="text-2xl font-black text-emerald-400">
                    {rankingInfo.percentile}%ile
                  </div>
                  <div className="text-[10px] text-emerald-300">Top Tier</div>
                </div>
              </div>
            </div>
          </div>

          {/* Normalization Formula Explanation Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
            <div className="flex items-center gap-2 font-bold text-navy-950 mb-2">
              <BarChart3 className="w-4 h-4 text-navy-800" />
              <span>Normalization & Ranking Methodology</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              To guarantee fairness across varying question difficulties, raw scores are normalized by weighting each question according to its cognitive tier:
            </p>
            <div className="my-2.5 p-3 rounded-lg bg-white border border-slate-200 font-mono text-[11px] text-navy-900 overflow-x-auto">
              S_norm = 100 × [ ∑(weight_i × correct_i) / ∑(weight_i) ] × (0.85 + 0.15 × Accuracy) × StreakBonus
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600 pt-1">
              <div>🟢 Easy: <strong>1.0x</strong></div>
              <div>🔵 Moderate: <strong>2.0x</strong></div>
              <div>🟣 Hard: <strong>3.5x</strong></div>
              <div>⚡ Expert: <strong>5.0x</strong></div>
            </div>
          </div>

          {/* National Cadre Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                National Cadre Leaderboard
              </h5>
              <span className="text-[11px] text-slate-400">Refreshed Hourly</span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Rank</th>
                    <th className="py-2.5 px-3">Cadre Officer</th>
                    <th className="py-2.5 px-3 hidden sm:table-cell">Baseline</th>
                    <th className="py-2.5 px-3 text-right">Normalized</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_LEADERBOARD.map((item, idx) => (
                    <tr
                      key={idx}
                      className={
                        item.isCurrentUser
                          ? 'bg-amber-50/80 font-bold text-amber-950 border-l-4 border-amber-500'
                          : 'hover:bg-slate-50 text-slate-700'
                      }
                    >
                      <td className="py-2.5 px-3 font-mono">
                        {item.rank === 1 ? '🥇 #1' : item.rank === 2 ? '🥈 #2' : item.rank === 3 ? '🥉 #3' : `#${item.rank}`}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-[10px] text-slate-400">{item.cadre}</div>
                      </td>
                      <td className="py-2.5 px-3 uppercase text-[10px] font-semibold text-slate-500 hidden sm:table-cell">
                        {item.baseline}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-navy-950">
                        {item.score}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-right">
          <button
            onClick={() => setLeaderboardOpen(false)}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-navy-800 hover:bg-navy-900 text-white transition shadow"
          >
            Close Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};
