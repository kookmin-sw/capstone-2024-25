// utils/handleMedicine.js
import { useEffect } from 'react';

export const handleToggle = (
  index,
  cycleIndex,
  part,
  newValue,
  setNewValue,
) => {
  const updatedValue = newValue.map((item, idx) => {
    console.log('newValue : ', newValue);
    console.log('setNewValue : ', setNewValue);
    if (idx === index) {
      const updatedCycle = [...item.medicineTime];
      if (updatedCycle.includes(part)) {
        updatedCycle.splice(updatedCycle.indexOf(part), 1); //
      } else {
        updatedCycle.push(part);
      }
      return { ...item, medicineTime: updatedCycle };
    }
    return item;
  });
  setNewValue(updatedValue);
};

export const useAdjustInputWidth = (editingName, editingIndex) => {
  useEffect(() => {
    const inputWidth = editingName.trim().length * 20;
    const medicineInfo = document.getElementById('medicine-info');
    const modifyWrapper = document.getElementById('modify-wrapper');

    const editNameElement = document.getElementById('edit-name');
    if (editNameElement && editingName && medicineInfo && modifyWrapper) {
      if (
        inputWidth <=
        medicineInfo.clientWidth - modifyWrapper.clientWidth - 12
      ) {
        editNameElement.style.width = `${inputWidth}px`;
      } else {
        editNameElement.style.width = `${
          medicineInfo.clientWidth - modifyWrapper.clientWidth - 12
        }px`;
      }
    }
  }, [editingName, editingIndex]); // 의존성 배열에 editingName과 editingIndex 추가
};
