import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEventDetails, addComment, updateComment, deleteComment, markComplete } from './eventSlice';
import { FaTrashAlt, FaUser, FaStickyNote } from 'react-icons/fa';


const EventDetailsModal = () => {
    const dispatch = useDispatch();
    const event = useSelector(state => state.event);
    const [newComment, setNewComment] = useState('');

    const handleInputChange = (field, value) => {
        dispatch(updateEventDetails({ field, value }));
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            dispatch(addComment({ id: Date.now(), text: newComment }));
            setNewComment('');
        }
    };

    const handleCommentEdit = (id, text) => {
        dispatch(updateComment({ id, text }));
    };

    const handleCommentDelete = (id) => {
        dispatch(deleteComment(id));
    };

    return (
        <div className="modal bg-white rounded-3xl text-2xl p-5 border shadow-lg w-1/2 mx-auto mt-10">
            <div className="flex justify-between py-5">
                <button
                    onClick={() => dispatch(markComplete())}
                    className={`${event.isComplete ? 'green-500' : 'gray-500'}`}
                    disabled={event.isComplete}
                >
                    {event.isComplete ? <img width="24" height="24" className='' src="https://img.icons8.com/android/24/000000/checked.png" alt="checked" /> : <img width="24" height="24" src="https://img.icons8.com/android/24/000000/checked.png" alt="checked" />}
                </button>
                <div className="flex items-center gap-3 text-red-500">
                    <FaTrashAlt
                        onClick={() => dispatch(markComplete())}
                        className=" h-4 w-4  text-red-500"

                    />
                    <img width="24" height="24" src="https://img.icons8.com/material-two-tone/24/multiply.png" alt="multiply"/>

                </div>
            </div>
            <div className="mb-4 relative">
                <input
                    type="text"
                    className="w-full p-2 px-5 font-bold text-red-500 border border-gray-300 rounded-3xl"
                    value={event.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                />
            </div>
            <div className="mb-4 relative">
                <input
                    type="datetime-local"
                    className="w-full p-2 font-bold text-red-700 border border-gray-300 rounded-3xl"
                    value={event.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                />
            </div>
            <div className="mb-4 py-2 justify-evenly  flex items-center">
                <FaUser className="text-gray-500 mr-2" />
                <label className="italic  text-gray-500 mr-2">Assign to:</label>
                <div className="flex border justify-evenly border-gray-300 rounded-3xl">
                    <img src="https://picsum.photos/id/1/200/300" className='w-11 h-10 rounded-full mt-2 ml-2' alt="" />
                    <select
                        className="px-2 py-3 w-56 text-gray-600 "
                        value={event.assignee}
                        onChange={(e) => handleInputChange('assignee', e.target.value)}
                    >

                        <option value="Jane Smith" >Jane Smith</option>
                    </select>
                </div>
            </div>
            <div className="flex mb-10 justify-evenly items-center">
                <FaStickyNote className="text-gray-500 mr-2" />
                <label className="italic text-gray-500 mr-2">Note:</label>
                <textarea
                    className="w-9/12 p-2 border border-gray-300 text-slate-500 text-lg font-semibold rounded-2xl"
                    value={event.note}
                    onChange={(e) => handleInputChange('note', e.target.value)}
                />

            </div>

            <div className="comments-section mb-4">
                <hr className='p-3' />
                <label className="px-2 p-2 italic font-bold">Comments</label>
                {event.comments.map(comment => (
                    <div key={comment.id} className="flex items-center mb-2 relative group">

                        <img src="https://picsum.photos/id/1/200/300" className=' w-11 h-10 rounded-full mt-2 ml-2' alt="" />
                        <div className="flex flex-col ml-4 mt-8 gap-0">
                            <p className="w-full text-slate-600 font-bold  text-lg">{event.assignee}</p>
                            <textarea className="w-full text-slate-600 font-semibold  text-lg"
                                onChange={(e) => handleCommentEdit(comment.id, e.target.value)}
                            >
                                {comment.text}
                            </textarea>

                            <FaTrashAlt
                                className="absolute top-1/2 opacity-0 group-hover:opacity-100 right-2 transform -translate-y-1/5 text-red-500 cursor-pointer"
                                onClick={() => handleCommentDelete(comment.id)}
                            />
                        </div>
                    </div>
                ))}

                <div className="flex flex-row justify-between">
                    <img src="https://picsum.photos/id/1/200/300" className=' w-14 h-14 rounded-full ' alt="" />
                    <div className='flex p-1 border border-gray-300 rounded-3xl  mb-4'>
                        <input
                            type="text"
                            className="p-2 mx-12 text-lg"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write comment..."
                        />
                        <button onClick={handleAddComment}>
                            <img src="https://img.icons8.com/windows/32/sent.png" className="p-2" alt="sent" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsModal;
