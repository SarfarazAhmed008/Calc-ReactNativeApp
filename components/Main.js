import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            number: '',
            result: '',
        }
        this.operators = ['C','D', '+', '-', '*', '/'];
    }
    getNumber = (num) => {
        const {number} = this.state;
        if (num == '='){
            return this.validate() && this.getResult();
        }
        this.setState({number: number+num, result: eval(number+num)}); 
    };
    getOperator = (opr) => {
        switch(opr){
            case 'C':
                this.setState({number: '', result: ''});
                break;
            case 'D': 
                let num =  this.state.number.split('');
                num.pop();
                this.setState({number: num.join('')});
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                if(this.state.number == '') return;
                let lastChar = this.state.number.split('').pop();
                if(this.operators.indexOf(lastChar) > 0) return;
                this.setState({number: this.state.number+opr});
        }
    };
    getResult(){
        const text = this.state.number;
        this.setState({result: eval(text)});
    }
    validate(){
        const num = this.state.number;
        switch(num.slice(-1)){
            case '+':
            case '-':
            case '*':
            case '/':
                return false;
        }
        return true;
    }
    render(){
        const numbers = [[7,8,9],[4,5,6],[1,2,3],['.',0,'=']];
        let rows = [];
        for(let i=0; i<4; i++){
            let row = [];
            for (let j=0; j<3; j++){
                row.push(
                    <TouchableOpacity key={numbers[i][j]} style={styles.btnStyle} onPress={()=>this.getNumber(numbers[i][j])}>
                        <Text style={[styles.btnText, styles.color, styles.fs]}>{numbers[i][j]}</Text>
                    </TouchableOpacity>
                );
            }
            rows.push(
                <View key={i} style = {styles.rowStyle}>{row}</View>
            );
        }
        let ops = [];
        for(let i=0; i<6; i++){
            ops.push(
                <TouchableOpacity key={this.operators[i]} style={styles.btnStyle} onPress={() => this.getOperator(this.operators[i]) }>
                        <Text style={[styles.btnText, styles.color, styles.fs]}>{this.operators[i]}</Text>
                </TouchableOpacity>
            );
        }
        return (
            <View style={styles.container}>
                <View style={styles.header}><Text style={styles.headerText}>SA Calculator</Text></View>
                <View style={styles.displayText}>
                    <Text style={[styles.displayTextStyle, styles.fs]}>{this.state.number}</Text>
                </View>
                <View style={styles.displayResult}>
                    <Text style={[styles.displayResultStyle, styles.fs]}>{this.state.result}</Text>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.numbers}>
                        {rows}
                    </View>
                    <View style={styles.operators}>
                        {ops}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    displayText: {
        flex: 2,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    color: {
        color: '#fff',
    },
    displayResult: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    buttons: {
        flex: 7,
        flexDirection: 'row',
    },
    numbers: {
        flex: 3,
        backgroundColor: '#636363',
    },
    operators: {
        flex: 1,
        backgroundColor: '#61c4a8',
    },
    displayTextStyle: {
        fontSize: 37,
        color: 'black',
    },
    displayResultStyle: {
        fontSize: 26,
        color: 'black',
    },
    btnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        flex: 1,
        //borderRadius: 30,
        elevation: 10,
        
    },
    btnText: {
        fontSize: 40,
        color: '#fff',
        textAlign: 'center',  
    },
    rowStyle: {
        flex: 1,
        flexDirection: 'row',
    },
    fs: {
        fontWeight: "100",
        fontFamily: 'sans-serif',
    },
    header: {
        justifyContent: 'center',
        alignSelf:'center',
    },
    headerText: {
        color: 'black',
    },
});