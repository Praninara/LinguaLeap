from locust import HttpUser, task, between

class GameUser(HttpUser):
    wait_time = between(1, 3)
    
    def on_start(self):
        # Login at the start of each user session
        self.client.post("/api/users/auth", json={
            "email": "ani@email.com",
            "password": "ani123"
        })
    
    @task(2)
    def get_memory_game_content(self):
        self.client.get("/api/games/stories/1/french")
        
    @task(2)
    def get_dino_game_content(self):
        self.client.get("/api/games/questions/1/spanish")
    
    @task(1)
    def get_leaderboard(self):
        self.client.get("/api/leaderboard/global")

class MultiplayerUser(HttpUser):
    wait_time = between(1, 2)
    
    def on_start(self):
        # Login
        response = self.client.post("/api/users/auth", json={
            "email": "ani@email.com",
            "password": "ani123"
        })
        self.token = response.cookies.get('jwt')
    
    @task(3)
    def make_guess(self):
        self.client.post(
            "/api/games/guess",
            json={"guess": "hello", "roomId": "test-room"},
            headers={"Authorization": f"Bearer {self.token}"}
        )
    
    @task(1)
    def update_xp(self):
        self.client.post(
            "/api/users/test-user/addXP",
            json={"xp": 100},
            headers={"Authorization": f"Bearer {self.token}"}
        )

class APIUser(HttpUser):
    wait_time = between(0.5, 1.5)
    
    @task(3)
    def get_memory_pairs(self):
        self.client.get("/api/memory-game/pairs/1")
    
    @task(3)
    def get_dino_questions(self):
        self.client.get("/api/dino-game/questions/1")
    
    @task(1)
    def get_metrics(self):
        self.client.get("/metrics")