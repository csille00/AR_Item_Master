import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FilterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [filterOption, setFilterOption] = useState<string>('option1');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-argray bg-opacity-50">
            <div className="bg-white p-4 rounded-md w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Table Filter</h2>
                    <button onClick={onClose} className="text-argray bg-white text-xl">
                        &times;
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Filter by option:
                    </label>
                    <select
                        value={filterOption}
                        onChange={(e) => setFilterOption(e.target.value)}
                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </div>
                {/*<div className="mb-4">*/}
                {/*    <label className="inline-flex items-center">*/}
                {/*        <input*/}
                {/*            type="checkbox"*/}
                {/*            className="form-checkbox h-4 w-4"*/}
                {/*            checked={includeOutdated}*/}
                {/*            onChange={() => setIncludeOutdated(!includeOutdated)}*/}
                {/*        />*/}
                {/*        <span className="ml-2 text-sm text-gray-700">Include outdated</span>*/}
                {/*    </label>*/}
                {/*</div>*/}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-lightgr text-white px-4 py-2 rounded-md hover:bg-argray"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

// export default FilterModal;