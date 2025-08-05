import defaultIcon from '../../assets/default.png'

const Account = ({ username, avatarUrl }) => {
  return (
    <div className="border-b mb-4 pb-4 mt-2 border-neutral-300 mr-4">
      <button className="flex p-0.5 hover:bg-neutral-300 rounded transition-colors relative gap-2 w-full items-center">
        <img
            src={avatarUrl ? `https://coinly-backend.onrender.com${avatarUrl}` : defaultIcon }
            alt="Avatar"
            className="w-10 h-10 rounded-full shrink-0"
        />
        <div className="text-start">
            <span className="text-sm font-semibold block">{username}</span>
        </div>
      </button>
    </div>
  )
}

export default Account
