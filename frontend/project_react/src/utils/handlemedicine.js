// utils/handleMedicine.js
import { useEffect } from 'react';
import { medicineApis } from '../api/apis/medicineApis';
import Swal from 'sweetalert2';

export const handleToggle = (
  index,
  cycleIndex,
  part,
  newValue,
  setNewValue,
) => {
  const updatedValue = newValue.map((item, idx) => {
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

export const updateMedicine = async (id, data, accessToken) => {
  await medicineApis.update(id, data, accessToken).then((res) => {
    if (res.status === 204) {
      // getMedicineList();
      Swal.fire({
        title: '약품 수정',
        text: '약품이 수정되었습니다.',
        confirmButtonText: '확인',
        icon: 'success',
      });
    }
  });
};
