import fs from 'node:fs'

const users = [];

for (let i = 1; i <= 100; i++) {
  users.push({
    email: `user${i}@example.com`,
    password: `pass${1000 + i}`,
    fullName: `User ${i}`,
    role:`${i%2==0?"candidate":"employer"}`
  });
}

fs.writeFileSync('mock_users_100.json', JSON.stringify(users, null, 2));
console.log("Generated 100 users");
