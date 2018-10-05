import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default class Main extends Component {
    state = {
        number: '',
    }
    getNumber = (num) => {
        const {number} = this.state;
        switch (num){
            case('='): {
                this.getResult();
                return;
            }
        }
        this.setState({number: number+num});
    };
    getOperator = (opr) => {
        switch(opr){
            case ('D'): {
                let num =  this.state.number.split('');
                num.pop();
                this.setState({number: num.join('')});
            }
        }
    };
    getResult(){
        //parse and calculate
    }
    render(){
        const numbers = [[7,8,9],[4,5,6],[1,2,3],['.',0,'=']];
        let rows = [];
        for(let i=0; i<4; i++){
            let row = [];
            for (let j=0; j<3; j++){
                row.push(
                    <TouchableOpacity style={styles.btnStyle} onPress={()=>this.getNumber(numbers[i][j])}>
                        <Text style={[styles.btnText, styles.color]}>{numbers[i][j]}</Text>
                    </TouchableOpacity>
                );
            }
            rows.push(
                <View style = {styles.rowStyle}>{row}</View>
            );
        }
        const operators = ['D', '+', '-', '*', '/'];
        let ops = [];
        for(let i=0; i<5; i++){
            ops.push(
                <TouchableOpacity style={styles.btnStyle} onPress={() => this.getOperator(operators[i]) }>
                        <Text style={[styles.btnText, styles.color]}>{operators[i]}</Text>
                </TouchableOpacity>
            );
        }


        return (
            <View style={styles.container}>
                <View style={styles.displayText}>
                    <Text style={[styles.displayTextStyle, styles.color ]}>{this.state.number}</Text>
                </View>
                <View style={styles.displayResult}>
                    <Text style={[styles.displayResultStyle, styles.color]}>23432</Text>
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
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    color: {
        color: 'white',
    },
    displayResult: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    buttons: {
        flex: 7,
        flexDirection: 'row',
    },
    numbers: {
        flex: 3,
        backgroundColor: 'red',
    },
    operators: {
        flex: 1,
        backgroundColor: 'black',
    },
    displayTextStyle: {
        fontSize: 37,

    },
    displayResultStyle: {
        fontSize: 26,
    },
    btnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        flex: 1,
        borderRadius: 30,
        backgroundColor: 'blue',
    },
    btnText: {
        fontSize: 40,
        color: 'white',
        textAlign: 'center',  
    },
    rowStyle: {
        flex: 1,
        flexDirection: 'row',
    },
});