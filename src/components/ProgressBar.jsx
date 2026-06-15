const ProgressBar = ({ current, total = 10 }) => {
  const percentage = (current / total) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">Progression</span>
        <span className="text-sm font-semibold text-orange-500">{current}/{total}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-orange-400 to-orange-500 h-3 rounded-full transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-3">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              i < current
                ? 'bg-orange-500 text-white scale-110'
                : 'bg-gray-100 text-gray-300'
            }`}
          >
            {i < current ? '✓' : i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressBar