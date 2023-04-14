export default function Main({ onEditProfile, onAddPlace, onEditAvatar, userInfo}) {
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-block">
            <img className="profile__avatar" src={userInfo.avatar} alt="Аватар" />
            <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userInfo.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile__about">{userInfo.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
      </section>
    </main>
  );
};