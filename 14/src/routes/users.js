import { generateToken, buildIdGenerator } from "../utils.js";

export default (app) => {
  const users = [];

  const generateId = buildIdGenerator();

  app.get("/users/new", (req, res) => res.view("src/views/users/new"));

  // BEGIN (write your solution here)
   app.post("/users", (req, res) => {
    const { firstName, lastName, email } = req.body;
    const id = generateId();
    const token = generateToken();
    
    const newUser = {
      id,
      firstName,
      lastName,
      email,
      token
    };
    
    users.push(newUser);
    
    // Устанавливаем токен в куки
    res.cookie("token", token, { httpOnly: true });
    
    // Редирект на страницу пользователя
    res.redirect(`/users/${id}`);
  });
  
  // 2. Обработчик GET `/users/:id` для просмотра пользователя
  app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const userToken = req.cookies?.token;
    
    if (!userToken) {
      return res.send("User not found");
    }
    
    // Ищем пользователя по id
    const user = users.find(u => String(u.id) === String(id));
    
    // Проверяем существование пользователя и совпадение токена
    if (!user || user.token !== userToken) {
      return res.send("User not found");
    }
    
    // Рендерим шаблон с данными пользователя
    res.view("src/views/users/show", { user });
  });


  // END
};
