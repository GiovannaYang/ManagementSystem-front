<template>
  <div class="container">
    <h1>关于学生管理系统</h1>
    <h2>已知存在的问题</h2>
    <ul>
      <li>修改完设置需要进行重新登录</li>
      <li>不要尝试通过地址栏进行页面跳转，后端有中间件但前端没有设置导航守卫，可以跳转但会出现一些问题</li>
      <li>刷新过后会认为已经退出登录</li>
    </ul>
    <h2>功能介绍</h2>
    <ul>
      <li>可以通过邮箱注册成为管理员，学生账号由管理员通过学号创建，默认密码123456</li>
      <li>学生只能看到自己的信息，对自己的信息进行修改以及修改自己的密码</li>
      <li>管理员可以看到所有学生的信息并进行修改，可以添加与删除学生，可以根据学号查找学生，可以修改自己的用户名与密码</li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-size: 3em;
  font-weight: bold;
  margin-bottom: 1em;
}

h2 {
  margin-top: 1em;
}

ul {
  font-size: 16px;
}

.container {
  padding: 0 10%;
}
</style>
