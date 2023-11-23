import { useState } from "react"

import { 
    Text,View,TextInput,
    StyleSheet,TouchableOpacity,ScrollView,
    Modal,FlatList,StatusBar
} from "react-native"

import registerNNPushToken from 'native-notify';
import AndriodCheckBox from 'expo-checkbox'


const Home = () => {
    registerNNPushToken(15263, 'zAwF47IfBkG2AzTJwJxC0J');
    const [checked,setCheck] = useState();
    const [todo,setTodo] = useState();
    const [completed,setComplete] = useState(false);
    const [dis,setDis] = useState(false);
    const [tasks,setTasks] = useState([]);
    const [timer,setTimer] = useState([]);
    const [isvisible,setisVisible] = useState(false);
    const [getId,setId] = useState([]);

    const trigger = () => {
        (checked) ? setCheck(false) : setCheck(true) 
    }

    const Todo = (text) =>{
        setTodo(text)
    }

    const display = () => {
        const date = new Date().getMilliseconds();

        setTasks((prev) => {

          const newTask = [...prev,{id:date,priority:checked,task:todo}];
          return newTask

        })
        setDis(true);
       
        // newTasks.push({priority:checked,task:todo});
        // setTasks(newTasks);
        
    }

    const complete = () => {
        (completed) ? setComplete(false) : setComplete(true)
    }

   

    const Clear = () => {
            tasks.length = 0;
            timer.length = 0;
            setDis(false)
    }

    const clock = () => {
        let day = 'AM';
        let Hours = new Date().getHours();
        let Minute = new Date().getMinutes();
        if(Hours == 0){
            Hours = 12;
        }
        else if(Hours > 12){
            Hours = Hours - 12;
            day = 'PM'
        }
        else{
            Hours = Hours
            day = 'AM'
        }
        let clockTime = Hours + ":" + Minute + day;
        timer.map((item) => {
            if(item.alaramTime == clockTime){
                console.log('Yes');
            }
            else{
                console.log('no')
            }
        })
    }


    const reminder = (name) => {
        const {id,task} = getId;
        let day = 'AM';
        let updatedDay = day;
        let hours = new Date().getHours();
        if(hours>12) {
             hours =  hours - 12 ;
             day = 'PM';
        }
        else
        { 
            hours = hours;
            day = "AM"
        }
        const minutes = new Date().getMinutes();
        const currentTime = hours+":"+minutes;
        const newMin = name*60 + minutes;
        let count = 0;
        let updatedHr = hours + name;    
        // let updatedHr = Math.floor(newMin / 60) + hours;
        if(updatedHr < 12){
            updatedDay = day;
        }
        else {
        do{
           if(updatedHr>12 && day == 'AM'){
            updatedHr = updatedHr - 12;
            day = 'PM';
           }
           else if(updatedHr>12 && day == 'PM'){
            updatedHr = updatedHr - 12;
            day = 'AM';
           }
        }while(updatedHr > 12)
    }
        const updatedMin = newMin % 60;
        const updatedTime = updatedHr + ":" + updatedMin + day;
        // minor error correct it

        setTimer((prev) => {
            prev.map((item) => {
                if(item.id == id){
                    const i = prev.indexOf(item);
                    prev.splice(i,i);
                }
            })    
            const timerDetails = [...prev,{id:id,time:currentTime,task:task,alaramTime:updatedTime}];
            return timerDetails;
        })
        // setInterval(clock,1000);
        setisVisible(false)
        
        
    }


    

    const visible = (id,task) => {
        setisVisible(true)
        setId({id:id,task:task})
        
    }

    
    return(
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <View style={styles.home}>
     
     <View style={styles.container}>
        
        <TextInput style={styles.input} type="text" placeholder="Enter Your Todo" 
        onChangeText={Todo}
        />
        
     <View style={{flex:1,flexDirection:'row',gap:5,alignItems:'center'}}>
        <View style={{flex:1,flexDirection:'row',gap:10}}>
        <AndriodCheckBox value={checked} onValueChange={trigger} />
        <Text>IMP</Text>
        </View>
        <View>
        <TouchableOpacity style={styles.touch} onPress={Clear}>
            <Text style={styles.plus}>Clear</Text>
        </TouchableOpacity>
        </View>
     </View>

    <View style={{flex:1,maxWidth:70,padding:10}}>
        <TouchableOpacity style={styles.touch} onPress={display}>
           <Text style={styles.plus}>ADD</Text>
        </TouchableOpacity>
     </View>

     </View>
 
{(dis) ? 
     <View style={styles.todoContainer}>
        {tasks.map((item) => 
        (
            (item.task) ? 
        <View style={styles.todoContainerSub1}>
        
        <View style={{flex:1}}>
            {(item.priority) ? 
          <Text style={styles.priority}>*{item.task}</Text>
        : <Text style={styles.nonpriority}>{item.task}</Text>   
        }
        </View>
        
        <View style={styles.todoContainersub3}>
        <AndriodCheckBox value={completed} onValueChange={complete} />
        <Text>completed</Text>
        <TouchableOpacity style={styles.touch} onPress={() => (visible(item.id,item.task))}>
            <Text style={styles.plus}>Remind</Text>
        </TouchableOpacity>
        </View>
        </View> : <Text style={styles.nonpriority}>Add your todo's</Text> 
        )
        )}
    </View> : <Text style={styles.nonpriority}>Add your todo's</Text>
        }


   <Modal visible={isvisible}>
            <View style={{flex:1,alignItems:'center'}}>
                <Text style={{borderWidth:1,padding:10,backgroundColor:'midnightblue',color:'white'}}>Select the Reminder Time</Text>
                <FlatList 
                data={[{id:'1',name:1},{id:'2',name:6},{id:'3',name:12}
                        ,{id:'4',name:24}]}      
                renderItem={({item})=>(
                <TouchableOpacity style={{paddingTop:20,borderWidth:1,margin:10,padding:10,backgroundColor:'red'}} onPress={() => (reminder(item.name))}>
                <Text style={{color:'white',fontWeight:'bold'}}>{item.name} Hrs</Text>
                </TouchableOpacity>
                )}
                
                />
                
            </View>
   </Modal>
   
</View>
</ScrollView>
    )
}

const styles = StyleSheet.create({
    home:{
       flex:1,
       flexDirection:'column'
    },
    container:{
       flex:1,
       maxHeight:60,
       backgroundColor:'#eee',
       flexDirection:'row',
       alignItems:'center'
    },
    input:{
        height:40,
        width:150,
        borderColor:'black',
        borderWidth:1,
        margin:10,
        marginRight:25,
        padding:10,
        borderRadius:10
    },
    plus:{
    
        color:'white',
        
    },
    touch:{
        backgroundColor:'red',
        padding:10,
        borderRadius:50
    },
    todoContainer:{
        flex:1,
        
    },
    todoContainerSub1:{
        flex:1,
        flexDirection:'row',
        
        alignItems:'center',
        borderColor:'black',
        borderBottomWidth:1,
        marginTop:10,
        justifyContent:'space-between'
        
    },
    priority:{
        margin:10,
        fontSize:20,
        color:'red',
        fontWeight:'bold',
    },
    nonpriority:
    {
        margin:10,
        fontSize:20
    },
    todoContainersub3:{
        flex:1,
        flexDirection:'row',
        gap:5,
        alignItems:'center'
    }

})

export default Home;