export default function ImagePopup() {
  return (
    <div className="popup popup_type_picture">
        <div className="popup__container popup__container_type_picture">
          <button className="popup__close-button" type="button"></button>
          <figure className="popup__figure">
            <img className="popup__image" alt="" />
            <figcaption className="popup__caption"></figcaption>
          </figure>
        </div>
      </div>
  )
}