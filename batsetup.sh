sudo modprobe batman-adv

sudo ip link set wlan0 down
sudo iwconfig wlan0 mode ad-hoc
sudo iwconfig wlan0 mode chadhoc
sudo iwconfig wlan0 mode ap any
sudo iwconfig wlan0 channel 8
sleep 1s
sudo ip link set wlan0 up
sleep 1s
sudo ifconfig wlan0 172.27.0.6/16
sleep 1s
sudo batctl if add wlan0
sleep 1s
sudo ifconfig bat0 up
sleep 5s

sudo ifconfig bat0  172.27.0.8/16
