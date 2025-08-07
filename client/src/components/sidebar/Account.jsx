import defaultIcon from '../../assets/default.png'
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Account = ({ username, avatarUrl }) => {
  const getAvatarUrl = (path) => {
      console.log('Avatar path received:', path); // Debug log
    
      if (!path) {
          console.log('No path provided, using default');
          return defaultIcon;
      }
      
      if (path.startsWith('http')) {
          console.log('Using full HTTP URL');
          return path;
      }
      
      const supabaseUrl = 'https://kfacbvnkbvuzoledhuds.supabase.co';
      
      let cleanPath = path;
      
      if (path.startsWith('/avatars/')) {
          cleanPath = path.slice(1); 
      }
      else if (path.startsWith('/')) {
          cleanPath = `avatars${path}`; 
      }
      else if (!path.startsWith('avatars/')) {
          cleanPath = `avatars/${path}`;
      }
      
      const fullUrl = `${supabaseUrl}/storage/v1/object/public/${cleanPath}`;
      console.log('Generated avatar URL:', fullUrl);
      
      return fullUrl;
};

  return (
    <div className="border-b mb-4 pb-4 mt-2 border-neutral-300 mr-4">
      <button className="flex p-0.5 hover:bg-neutral-300 rounded transition-colors relative gap-2 w-full items-center">
        <img
            src={getAvatarUrl(avatarUrl)}
            alt="Avatar"
            className="w-10 h-10 rounded-full shrink-0"
            onError={(e) => {
                e.target.src = defaultIcon;
            }}
        />
        <div className="text-start">
            <span className="text-sm font-semibold block">{username}</span>
        </div>
      </button>
    </div>
  )
}

export default Account
