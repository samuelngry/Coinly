import defaultIcon from '../../assets/default.png'
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Account = ({ username, avatarUrl }) => {
  const getAvatarUrl = (path) => {
      if (!path) return defaultIcon;
      
      if (path.startsWith('http')) return path;
      
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      
      if (!supabaseUrl) {
          console.warn('VITE_SUPABASE_URL not found in environment variables');
          return defaultIcon;
      }
      
      const cleanPath = path.startsWith('/') ? path.slice(1) : path;
      
      return `${supabaseUrl}/storage/v1/object/public/${cleanPath}`;
  };

  return (
    <div className="border-b mb-4 pb-4 mt-2 border-neutral-300 mr-4">
      <button className="flex p-0.5 hover:bg-neutral-300 rounded transition-colors relative gap-2 w-full items-center">
        <img
            src={getAvatarUrl(avatarUrl)}
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
