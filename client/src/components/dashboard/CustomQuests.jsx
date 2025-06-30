import React, { useState } from 'react'
import { Star, CheckIcon, PawPrint, CircleCheck, Pencil, Trash, ChevronDown } from 'lucide-react'
import noteIcon from '../../assets/note.png'
import newQuestIcon from '../../assets/newquest.png'

const CustomQuests = ({ quests, onComplete, completedCount, totalCount, onAddCustomQuest }) => {
    const [open, setOpen] = useState(false);
    const [questText, setQuestText] = useState(''); 

    const handleAddQuest = () => {
      if (questText.trim() === '') {
        alert("Quest text cannot be empty");
        return;
      }
      onAddCustomQuest(questText);
      setQuestText(''); // Reset the input field
      setOpen(false); // Close the dialog
    };

    const sortedQuests = quests.sort((a, b) => {
      if (a.status === 'Completed' && b.status !== 'Completed') return 1;
      if (b.status === 'Completed' && a.status !== 'Completed') return -1;
      return 0;
    });

    return (
        <div className='flex flex-col mt-10 lg:mt-15'>
            <div className='flex items-center gap-3 mb-2 justify-center lg:justify-start'>
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-800 p-2 rounded-xl shadow-lg">
                    <Pencil className='w-4 h-4 text-white' />
                </div>
                <h3 className='text-sm lg:text-lg'>Personal Quests</h3>
                <div className='bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs lg:text-sm font-bold flex items-center gap-1'>
                    <Star className="w-3 h-3 fill-current" />
                    <span>{completedCount}/{totalCount}</span>
                </div>
            </div>

            {/* Table Layout for Laptop and Above */}
            {quests.length > 0 && (
              <div className='lg:w-full hidden lg:block'>
                <table className='w-full table-fixed text-left'>
                    <thead>
                        <tr className='border-b-2 border-gray-300'>
                            <th className='px-6 py-3 text-sm font-semibold text-gray-700 w-1/2'>Quest</th>
                            <th className='px-6 py-3 text-sm font-semibold text-gray-700 w-1/6'><PawPrint alt='Paw' className='w-5 h-5 text-orange-500'/></th>
                            <th className='px-6 py-3 text-sm font-semibold text-gray-700 w-1/6'>Status</th>
                            <th className='px-6 py-3 text-sm font-semibold text-gray-700 w-1/6'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedQuests.map((quest) => (
                            <tr
                                key={quest.id}
                                className={`${quest.status === 'Completed' ? 'bg-green-100' : 'bg-white hover:bg-green-50'} transition-all duration-300 ease-in-out border-b border-gray-200 rounded-lg`}
                            >
                                <td className='px-6 py-4 flex items-center'>
                                    {quest.status !== 'Completed' ? (
                                        <img src={noteIcon} alt='Quest' className='w-10 h-10 inline' />
                                    ) : (
                                        <CircleCheck className='w-10 h-10 text-green-500 inline' />
                                    )}
                                    <span className={`text-sm font-semibold ml-3 ${quest.status === 'Completed' ? 'line-through text-green-500' : ''}`}>
                                        {quest.quest_text}
                                    </span>
                                </td>
                                <td className='px-6 py-4 text-sm text-gray-700'>
                                    {quest.xp}
                                </td>
                                <td className='px-6 py-4'>
                                    <span className={`text-xs font-semibold ${quest.status === 'Completed' ? 'text-green-500' : 'text-gray-500'}`}>
                                        {quest.status}
                                    </span>
                                </td>
                                <td className='px-6 py-4'>
                                  {quest.status !== 'Completed' && (
                                      <div className='flex items-center justify-center'>
                                          {/* Dropdown Menu */}
                                          <div className='relative group'>
                                              <button
                                                  className='bg-gradient-to-r from-orange-500 to-orange-700 text-white px-3 py-1 rounded-full hover:from-orange-600 flex items-center gap-1'
                                                  title="Quest Actions"
                                              >
                                                  <span className='text-sm'>Actions</span>
                                                  <ChevronDown className='w-4 h-4' />
                                              </button>
                                              
                                              {/* Dropdown Content */}
                                              <div className='absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10'>
                                                  <button
                                                      onClick={() => onComplete(quest.id, quest.type)}
                                                      className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center gap-2 rounded-t-lg'
                                                  >
                                                      <CheckIcon className='w-4 h-4' />
                                                      Complete
                                                  </button>
                                                  <button
                                                      onClick={() => onEdit(quest.id)}
                                                      className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2'
                                                  >
                                                      <Pencil className='w-4 h-4' />
                                                      Edit
                                                  </button>
                                                  <button
                                                      onClick={() => onDelete(quest.id)}
                                                      className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 rounded-b-lg'
                                                  >
                                                      <Trash className='w-4 h-4' />
                                                      Delete
                                                  </button>
                                              </div>
                                          </div>
                                      </div>
                                  )}
                              </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}

            {/* Mobile Layout */}
            <div className='lg:hidden space-y-1 grid grid-cols-1 lg:grid-cols-3 lg:space-x-2 lg:space-y-0'>
                {quests.length > 0 ? (
                    sortedQuests.map((quest) => (
                        <div key={quest.id} className={`mt-3 p-3 rounded-xl ${quest.status === 'Completed' ? 'bg-green-100' : 'bg-white'} shadow-none transition-shadow duration-300 hover:shadow-gray-400 hover:shadow-lg border border-neutral-300 flex justify-between items-center gap-2`}>
                            <div className='flex items-center gap-2 flex-1'>
                                {quest.status !== 'Completed' ? (
                                    <img src={noteIcon} alt='Quest' className='w-10 h-10'/>
                               ) : (
                                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                                        <CircleCheck className='text-green-500' style={{ width: '100%', height: '100%' }}/>
                                    </div>
                                )}
                                <span className={`text-xs break-words font-semibold ${quest.status === 'Completed' ? 'line-through text-green-500' : ''}`}>{quest.quest_text}</span>
                            </div>

                            <div className='flex items-center shrink-0'>
                                {quest.status !== 'Completed' && (
                                    <div className="bg-orange-100 text-orange-600 px-1.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                        <span>{quest.xp}</span>
                                        <PawPrint className="w-3 h-3" />
                                    </div>
                                )}

                                {quest.status !=='Completed' && (
                                    <button
                                        onClick={() => onComplete(quest.id, quest.type)}
                                    >
                                        <div className='w-8 h-8 cursor-pointer rounded-xl border border-neutral-300 shadow-xl flex items-center justify-center hover:bg-green-100 ml-1.5'>
                                            <CheckIcon className='w-5 h-5 text-green-500'/>
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ): (
                    <p className='text-sm text-center text-gray-500 col-span-3'></p>
                )}
            </div>
            
            {/* Button to add a custom quest */}
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-orange-600"
              onClick={() => setOpen(true)}
            >
              Add Quest
            </button>

            {/* Dialog for adding custom quest */}
            {open && (
              <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div 
                  className="fixed inset-0" 
                  onClick={() => setOpen(false)}
                ></div>
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto transform transition-all duration-300 scale-100">
                  <div className="p-6">
                    <div className='flex justify-center'>
                      <img src={newQuestIcon} className='w-65 h-65 '/>
                    </div>
                    
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-1">
                        New Quest! 🎯
                      </h2>
                      <p className="text-gray-600 text-sm">
                        What adventure shall we embark on?
                      </p>
                    </div>
                    
                    <input
                      type="text"
                      value={questText}
                      onChange={(e) => setQuestText(e.target.value)}
                      placeholder="Enter your quest..."
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200"
                    />
                    
                    <div className="mt-6 space-y-3">
                      <button
                        onClick={handleAddQuest}
                        disabled={!questText.trim()}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed"
                      >
                        Add Quest ✨
                      </button>
                      <button
                        onClick={() => setOpen(false)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
    )
}

export default CustomQuests;
