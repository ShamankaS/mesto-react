import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  };

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}>
      <label className="form__field">
        <input
          className="form__input"
          id="input_type_avatar"
          placeholder="Ссылка на изображение"
          name="avatar"
          required
          type="url"
          ref={avatarRef} />
        <span className="form__input-error" id="error-input_type_avatar"></span>
      </label>
    </PopupWithForm>)

}