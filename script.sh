
#!/bin/bash
"""
echo "hello moiz"

status="success"


if [ "$status" == "success" ]; then
  echo "Status is Successfull"
else
  echo "status is not successfull"

fi


num=20

if [ "$num" -gt 21 ]; then
  echo "YES!! 20 IS > 10"
else
  echo "LAG RAHA HAI MATH BHOOL GAYE HO HEHEH..."
fi



echo "enter number"
read number

if [ $number -gt 10 ]; then
  echo "greater then 10"

elif [ $number -eq 10 ]; then
  echo "exactly 10"
else
  echo "less then 10"
fi


for i in {1..5}; do
  echo "iteration $i"
done


#for while loop

count=1
while [ $count -le 5 ]; do 
  echo "count is $count"
  ((count++))
done



#until loop

count=5
until [ $count -gt 5]; do
  echo "count is $count"
  ((count++))
done


#countineou loop
servers=("web1" "web2")
apps=("frontend" "backend")

for server in "${servers[@]}"
do
  for app in "${apps[@]}"
  do
    echo "Deploying $app on $server"
  done
done







#function 


deploy() {
  echo "Deploying application..."
  echo "Deployment completed!"
}

deploy
deploy



backup() {
  echo "Starting backup..."
  tar -czf backup.tar.gz /home/user/data
  echo "Backup completed!"
}

backup




#functin advanced
greet() {
  local name=$1
  echo "Hello, $name!"
}

greet "Alice"


#fun with return
add() {
  local sum=$(($1 + $2))
  echo $sum
}

result=$(add 5 3)
echo "The sum is $result"




#array multiple value store krne ka liye


servers=("web1" "web2" "db1")

echo "First server: ${servers[0]}"

servers[1]="web2-new"

echo "All servers: ${servers[@]}"""
