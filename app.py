# from flask import Flask, request, jsonify, render_template

# app = Flask(__name__)

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/toggle-light', methods=['POST'])
# def toggle_light():
#     try:
#         # 获取前端传来的状态数据
#         data = request.get_json()
#         status = data.get('status')
        
#         # 记录详细的状态信息
#         if status:
#             message = "灯光已开启"
#             print(message)
#         else:
#             message = "灯光已关闭"
#             print(message)
            
#         # 返回更详细的响应
#         return jsonify({
#             'status': 'success',
#             'message': message,
#             'light_status': status
#         }), 200
        
#     except Exception as e:
#         error_message = f"操作失败: {str(e)}"
#         print(error_message)
#         return jsonify({
#             'status': 'error',
#             'message': error_message
#         }), 500

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify, render_template
import serial
import time
import threading

app = Flask(__name__)

# 设置串口连接
try:
    ser = serial.Serial(
        port='COM10',  # 根据实际Arduino连接的端口修改
        baudrate=9600,
        timeout=1
    )
    print("串口连接成功")
except Exception as e:
    print(f"串口连接失败: {str(e)}")
    ser = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/toggle-light', methods=['POST'])
def toggle_light():
    try:
        # 获取前端传来的状态数据
        data = request.get_json()
        status = data.get('status')
        
        if ser:
            # 向Arduino发送控制命令
            if status:
                ser.write(b'1')  # 发送1表示开灯
                message = "灯光已开启"
            else:
                ser.write(b'0')  # 发送0表示关灯
                message = "灯光已关闭"
            
            # 等待Arduino响应
            time.sleep(0.1)
            print(message)
        else:
            message = "串口未连接，无法控制灯光"
            print(message)
            
        return jsonify({
            'status': 'success',
            'message': message,
            'light_status': status
        }), 200
        
    except Exception as e:
        error_message = f"操作失败: {str(e)}"
        print(error_message)
        return jsonify({
            'status': 'error',
            'message': error_message
        }), 500
#
if __name__ == '__main__':# 启动flask
    app.run(host='0.0.0.0', port=5000)# 启动flask