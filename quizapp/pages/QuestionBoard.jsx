import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';

class QuestionBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: {
                answers: {}
            },
            checked: null,
            loadingNext: false,
            questionNumber: 1,
        }
    }

    getQuestion = () => {

        console.log("Api call");
        fetch("http://192.168.100.14:3000/quiz", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({questionNumber: this.state.questionNumber})
        }).then(res => res.json()).then(res => {
            this.setState({ question: res.question, loadingNext: false, checked: null });
        }).catch(err => {
            this.setState({ question: "Error" });
        });

    }

    submit = () => {

        if (this.state.question.correct === this.state.checked) {
            Alert.alert(
                "Correct!",
                "Your answer is correct",
                [
                    { text: 'Dismiss', onPress: () => { this.nextQuestion()} },
                ],
            );
        } else {
            Alert.alert(
                "Wrong",
                "Your answer is wrong",
                [
                    { text: 'Dismiss', onPress: () => { this.nextQuestion()} },
                ],
            );
        }

        
        
        

    }

    nextQuestion = () => {
        let qno = this.state.questionNumber;
        this.setState({loadingNext: true, questionNumber: qno+1});
        //this timeout is just to show "Loading next question text". In production change this "this.getQuestion()""
        setTimeout(() => {this.getQuestion()}, 1000);
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={{ fontSize: 20 }}>{this.state.question.statement}</Text>
                    <RadioButton.Group>

                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="a"
                                status={this.state.checked === 'a' ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ checked: 'a' }) }}
                            />
                            <Text style={{ marginLeft: 10, marginTop: 8 }}>{this.state.question.answers.a}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="b"
                                status={this.state.checked === 'b' ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ checked: 'b' }) }}
                            />
                            <Text style={{ marginLeft: 10, marginTop: 8 }}>{this.state.question.answers.b}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="c"
                                status={this.state.checked === 'c' ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ checked: 'c' }) }}
                            />
                            <Text style={{ marginLeft: 10, marginTop: 8 }}>{this.state.question.answers.c}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="d"
                                status={this.state.checked === 'd' ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ checked: 'd' }) }}
                            />
                            <Text style={{ marginLeft: 10, marginTop: 8 }}>{this.state.question.answers.d}</Text>
                        </View>

                    </RadioButton.Group>

                    <View style={{ marginTop: 20 }}>
                        <Button
                            title="Submit"
                            onPress={this.submit}
                        />
                    </View>

                    <View style={{marginTop: 30, alignContent: "center", alignSelf: "center"}}>
                        <Text>{this.state.loadingNext ? "Loading next question" : null}</Text>
                    </View>

                </View>
            </View>
        );
    }

    componentDidMount() {
        this.getQuestion();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        flexDirection: "row",
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    row: {
        flex: 0.8,
    },


});


export default QuestionBoard;
