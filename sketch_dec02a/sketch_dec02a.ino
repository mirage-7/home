const int LED_PIN = 13;  // LED连接到13号引脚

void setup() {
  Serial.begin(9600);     // 初始化串口通信
  pinMode(LED_PIN, OUTPUT); // 设置LED引脚为输出模式
  digitalWrite(LED_PIN, LOW); // 初始状态设为关闭
}

void loop() {
  if (Serial.available() > 0) {  // 如果有数据可读
    char command = Serial.read(); // 读取命令
    
    if (command == '1') {
      digitalWrite(LED_PIN, HIGH); // 开灯
      Serial.println("LED ON");
    }
    else if (command == '0') {
      digitalWrite(LED_PIN, LOW);  // 关灯
      Serial.println("LED OFF");
    }
  }
}