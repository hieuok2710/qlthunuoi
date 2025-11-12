import React from 'react';
import { TeamMember } from '../types';
import { FaEdit } from 'react-icons/fa';

interface TeamCardProps {
    member: TeamMember;
    isAdmin: boolean;
    onEdit: (member: TeamMember) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, isAdmin, onEdit }) => (
  <div className="bg-white dark:bg-gray-800 text-center p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 relative">
    <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-teal-200 dark:border-teal-700" />
    <h4 className="text-xl font-bold text-gray-800 dark:text-white">{member.name}</h4>
    <p className="text-teal-600 dark:text-teal-400 font-semibold mb-2">{member.specialty}</p>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
    {isAdmin && (
        <button
            onClick={() => onEdit(member)}
            className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            aria-label={`Chỉnh sửa ${member.name}`}
        >
            <FaEdit />
        </button>
    )}
  </div>
);

export default TeamCard;