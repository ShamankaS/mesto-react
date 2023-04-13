import logoPath from './blocks/header/__logo/header__logo.svg';
import avatarPath from './blocks/profile/profile__avatar.jpg';

function App() {
  return (
    <body class="body">
      <div class="page">
        <header class="header">
          <img class="header__logo" src={logoPath} alt="логотип Mesto" />
        </header>
        <main class="main">
          <section class="profile">
            <div class="profile__container">
              <div class="profile__avatar-block">
                <img class="profile__avatar" src={avatarPath} alt="Аватар" />
                <div class="profile__avatar-overlay"></div>
              </div>
              <div class="profile__info">
                <h1 class="profile__name">Жак-Ив Кусто</h1>
                <button class="profile__edit-button" type="button"></button>
                <p class="profile__intro">Исследователь океана</p>
              </div>
            </div>
            <button class="profile__add-button" type="button"></button>
          </section>
          <section class="elements">
          </section>
        </main>
        <footer class="footer">
          <p class="footer__copyright">&#169; 2023 Mesto Russia</p>
        </footer>
      </div>
      <div class="popup popup_type_profile">
        <div class="popup__container popup__container_type_form">
          <button class="popup__close-button" type="button"></button>
          <h2 class="popup__title">Редактировать профиль</h2>
          <form class="popup__form form" name="profile-info" novalidate>
            <label class="form__field">
              <input class="form__input" id="input_type_name" placeholder="Имя" name="fullname" required
                minlength="2" maxlength="40" />
              <span class="form__input-error" id="error-input_type_name" name="error-input_type_name"></span>
            </label>
            <label class="form__field">
              <input class="form__input" id="input_type_intro" placeholder="О себе" name="job" required
                minlength="2" maxlength="200" />
              <span class="form__input-error" id="error-input_type_intro" name="error-input_type_intro"></span>
            </label>
            <button type="submit" class="form__submit" disabled>Сохранить</button>
          </form>
        </div>
      </div>
      <div class="popup popup_type_card">
        <div class="popup__container popup__container_type_form">
          <button class="popup__close-button" type="button"></button>
          <h2 class="popup__title">Новое место</h2>
          <form class="popup__form form" name="card" novalidate>
            <label class="form__field">
              <input class="form__input" id="input_type_title" placeholder="Название" name="name" required
                minlength="2" maxlength="30" />
              <span class="form__input-error" id="error-input_type_title"></span>
            </label>
            <label class="form__field">
              <input class="form__input" id="input_type_link" placeholder="Ссылка на картинку" name="link"
                required type="url" />
              <span class="form__input-error" id="error-input_type_link"></span>
            </label>
            <button type="submit" class="form__submit" disabled>Создать</button>
          </form>
        </div>
      </div>
      <div class="popup popup_type_picture">
        <div class="popup__container popup__container_type_picture">
          <button class="popup__close-button" type="button"></button>
          <figure class="popup__figure">
            <img class="popup__image" alt="" />
            <figcaption class="popup__caption"></figcaption>
          </figure>
        </div>
      </div>
      <div class="popup popup_type_card-delete">
        <div class="popup__container popup__container_type_card-delete">
          <button class="popup__close-button" type="button"></button>
          <h2 class="popup__title popup__title_type_card-delete">Вы уверены?</h2>
          <form class="popup__form form" name="card-delete">
            <button type="submit" class="form__submit form__submit_type_card-delete">Да</button>
          </form>
        </div>
      </div>
      <div class="popup popup_type_profile-update">
        <div class="popup__container popup__container_type_form">
          <button class="popup__close-button" type="button"></button>
          <h2 class="popup__title">Обновить аватар</h2>
          <form class="popup__form form" name="profile-update" novalidate>
            <label class="form__field">
              <input class="form__input" id="input_type_img-link" placeholder="Ссылка на изображение"
                name="avatar" required type="url" />
              <span class="form__input-error" id="error-input_type_img-link"></span>
            </label>
            <button type="submit" class="form__submit" disabled>Сохранить</button>
          </form>
        </div>
      </div>
      <template id="template">
        <div class="element">
          <img class="element__image" />
          <button class="element__trash" type="button"></button>
          <div class="element__block">
            <h3 class="element__title"></h3>
            <div class="element__like-container">
              <button class="element__like" type="button"></button>
              <span class="element__like-counter">0</span>
            </div>
          </div>
        </div>
      </template>
    </body>
  );
}

export default App;
