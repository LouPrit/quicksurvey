(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(e,t,a){},38:function(e,t,a){e.exports=a(78)},43:function(e,t,a){},44:function(e,t,a){},47:function(e,t,a){},65:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(34),i=a.n(r),o=(a(43),a(2)),l=a(3),c=a(5),u=a(4),m=a(1),d=a(6),p=(a(44),a(9)),v=a(14),h=a(17),g=a.n(h),b=a(15),y=(a(47),a(7)),f=a.n(y),E=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={accForm:{username:"",password:"",email:"",firstName:"",lastName:""}},a.textChanged=a.textChanged.bind(Object(m.a)(a)),a.createAccount=a.createAccount.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){document.title="Signup for free!"}},{key:"textChanged",value:function(e){var t=e.target.name;this.setState({accForm:Object.assign({},this.state.accForm,Object(b.a)({},t,e.target.value))})}},{key:"createAccount",value:function(e){var t=this;e.preventDefault(),f.a.post("http://localhost:3001/account/",this.state.accForm).then(function(e){var a=e.data;a.exists?a.username===t.state.accForm.username?alert("Username already registered"):a.email===t.state.accForm.email&&alert("Email already registered"):(console.log("Account successfully created"),console.log(e),t.setState({accForm:{username:"",password:"",email:"",firstName:"",lastName:""}}),alert("Account successfully created"),window.location.assign("http://localhost:3000/login"))}).catch(function(e){console.error(e)})}},{key:"render",value:function(){return s.a.createElement("div",{className:"App-main"},s.a.createElement("h1",{id:"signupHeading"},"Create your free account"),s.a.createElement("h2",null,"Already have account? ",s.a.createElement("a",{href:"login"},"Log In")),s.a.createElement("form",{className:"signupForm",onSubmit:this.createAccount},s.a.createElement("p",null,"~ Create an account ~"),s.a.createElement("input",{className:"signupInput",type:"text",name:"username",placeholder:"Username",onChange:this.textChanged,value:this.state.accForm.username,autoComplete:"off",required:!0}),s.a.createElement("input",{className:"signupInput",type:"password",name:"password",placeholder:"Password",onChange:this.textChanged,value:this.state.accForm.password,autoComplete:"off",required:!0}),s.a.createElement("input",{className:"signupInput",type:"email",name:"email",placeholder:"Email",onChange:this.textChanged,value:this.state.accForm.email,autoComplete:"on",required:!0}),s.a.createElement("div",{className:"nameSection"},s.a.createElement("input",{className:"signupInput",type:"text",id:"firstName",name:"firstName",placeholder:"First Name",onChange:this.textChanged,value:this.state.accForm.firstName,autoComplete:"on",required:!0}),s.a.createElement("input",{className:"signupInput",type:"text",id:"lastName",name:"lastName",placeholder:"Last Name",onChange:this.textChanged,value:this.state.accForm.lastName,autoComplete:"on",required:!0})),s.a.createElement("input",{className:"signupInput btn btn-dark",type:"submit",name:"submit",value:"Create Account"})))}}]),t}(n.Component),N=(a(65),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).SurveyList=function(){return a.state.retrievedData?0===a.state.surveys.length?s.a.createElement("h1",null,"No surveys found!"):a.state.surveys.map(function(e,t){return s.a.createElement("li",{key:t,className:"buttonList"},s.a.createElement(p.b,{className:"allSurveysPageButt btn btn-dark",to:"/viewsurvey/?id=".concat(e.id,"&user=").concat(e.username)},e.title," by ",e.username))}):s.a.createElement("h1",null,"Retrieving surveys...")},a.state={retrievedData:!1,surveys:[]},a.SurveyList=a.SurveyList.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.title="All Surveys",f.a.get("http://localhost:3001/survey/").then(function(t){return e.setState({retrievedData:!0,surveys:t.data})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){return s.a.createElement("div",{className:"App-main"},s.a.createElement("h1",{id:"loginHeading"},"All Surveys"),s.a.createElement("ul",{className:"survey-list-main"},s.a.createElement(this.SurveyList,null)))}}]),t}(n.Component)),S=(a(74),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={loginForm:{username:"",password:""}},a.textChanged=a.textChanged.bind(Object(m.a)(a)),a.login=a.login.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){document.title="Log in to your account"}},{key:"textChanged",value:function(e){var t=e.target.name;this.setState({loginForm:Object.assign({},this.state.loginForm,Object(b.a)({},t,e.target.value))})}},{key:"verifyToken",value:function(){var e=localStorage.getItem("qs_auth_token");if(e){var t=g()(e);return t.exp>Date.now()/1e3&&t.username}return!1}},{key:"login",value:function(e){var t=this;e.preventDefault(),f.a.get("http://localhost:3001/account/".concat(this.state.loginForm.username,"/").concat(this.state.loginForm.password)).then(function(e){if(e.data.token){localStorage.setItem("qs_auth_token",e.data.token);var a=t.verifyToken();a?(console.log("Logging in"),t.props.setLogInState(!0,a),t.setState({loginForm:{username:"",password:""}}),window.location.assign("http://localhost:3000/")):console.log("Error: Looks like token was invalid")}else e.data.disabled?alert("Account disabled"):alert("Incorrect Username or Password")}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){return s.a.createElement("div",{className:"App-main"},s.a.createElement("h1",{id:"loginHeading"},"Log in to your account"),s.a.createElement("form",{className:"loginForm",onSubmit:this.login},s.a.createElement("p",null,"~ Log in~"),s.a.createElement("input",{className:"loginInput",type:"text",name:"username",placeholder:"Username",onChange:this.textChanged,value:this.state.loginForm.username,autoComplete:"off",required:!0}),s.a.createElement("input",{className:"loginInput",type:"password",name:"password",placeholder:"Password",onChange:this.textChanged,value:this.state.loginForm.password,autoComplete:"off",required:!0}),s.a.createElement("input",{className:"loginInput btn btn-dark",type:"submit",name:"submit",value:"Log in"})))}}]),t}(n.Component)),O=a(20),k=(a(75),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={title:"",description:"",username:e.username,id:Date.now(),questions:[{id:0,quesType:"radio",question:"",options:""}]},a.Question=a.Question.bind(Object(m.a)(a)),a.textChanged=a.textChanged.bind(Object(m.a)(a)),a.addQuestion=a.addQuestion.bind(Object(m.a)(a)),a.removeQuestion=a.removeQuestion.bind(Object(m.a)(a)),a.saveSurvey=a.saveSurvey.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){document.title="Create a survey"}},{key:"textChanged",value:function(e){var t=Number(e.target.id),a=e.target.name;if("title"===a||"description"===a)this.setState(Object(b.a)({},a,e.target.value));else if("question"===a||"options"===a){var n=JSON.parse(JSON.stringify(this.state.questions));n[n.findIndex(function(e){return e.id===t})][a]=e.target.value,this.setState({questions:n})}else{var s=JSON.parse(JSON.stringify(this.state.questions));s[s.findIndex(function(e){return e.id===t})].quesType=e.target.value,this.setState({questions:s})}}},{key:"addQuestion",value:function(e){e.preventDefault(),this.setState({questions:[].concat(Object(O.a)(this.state.questions),[{id:Date.now(),quesType:"radio",question:"",options:""}])})}},{key:"questionLayout",value:function(e){return s.a.createElement("li",{className:"insideQuestionDiv",key:e,id:e},s.a.createElement("a",{href:" ",onClick:this.removeQuestion,className:"shrinkAnchorMinus"},s.a.createElement("i",{className:"far fa-minus-square fa-2x",id:e})),s.a.createElement("div",{className:"questionType",onChange:this.textChanged},s.a.createElement("p",{className:"boldLabel"},"Style:"),s.a.createElement("label",null,s.a.createElement("input",{type:"radio",name:e,id:e,value:"radio",defaultChecked:"true"})," Radio (Only one option can be chosen)"),s.a.createElement("label",null,s.a.createElement("input",{type:"radio",name:e,id:e,value:"checkbox"})," Checkbox (Multiple opttions can be chosen)")),s.a.createElement("div",{id:"quesDiv"},s.a.createElement("label",{id:"#quesLabel",className:"boldLabel"},"Question: "),s.a.createElement("input",{type:"text",id:e,name:"question",className:"quesInput",placeholder:"Question",onChange:this.textChanged,required:!0})),s.a.createElement("div",{id:"optionsDiv"},s.a.createElement("label",{id:"#optionsLabel",className:"boldLabel"},"Options:"),s.a.createElement("input",{type:"text",id:e,name:"options",className:"optionsInput",placeholder:"Comma seperated e.g. (Option 1, Option 2)",onChange:this.textChanged,required:!0})))}},{key:"Question",value:function(){var e=this;return this.state.questions.map(function(t){return e.questionLayout(t.id)})}},{key:"removeQuestion",value:function(e){e.preventDefault();var t=Number(e.target.id);if(0!==t){var a=JSON.parse(JSON.stringify(this.state.questions));a.splice(a.findIndex(function(e){return e.id===t}),1),this.setState({questions:Object(O.a)(a)})}else alert("Unable to remove")}},{key:"createStatsObject",value:function(e){if(e.id){var t={id:e.id};return e.questions.map(function(e){return t[e.question]={}}),e.questions.map(function(e){return e.options.split(", ").map(function(a){return t[e.question][a]=0})}),t}return null}},{key:"saveSurvey",value:function(e){var t=this;e.preventDefault();var a=this.createStatsObject(this.state);if(null!==a){var n=localStorage.getItem("qs_auth_token");f.a.post("http://localhost:3001/survey/create/",[this.state,a],{headers:{Authorization:"Bearer ".concat(n)}}).then(function(e){alert("Survey saved!"),document.getElementById("myForm").reset(),t.setState({title:"",description:"",username:t.props.username,id:Date.now(),questions:[{id:0,quesType:"radio",question:"",options:""}]})}).catch(function(e){alert("Failed, see console for more info"),console.log(e)})}else console.log("FAILED, NO ID")}},{key:"render",value:function(){return s.a.createElement("div",{className:"App-main"},s.a.createElement("h1",{className:"createHeading"},"Create a survey"),s.a.createElement("div",{className:"createSurveyMain"},s.a.createElement("form",{id:"myForm",className:"createSurveyForm",onSubmit:this.saveSurvey},s.a.createElement("div",{id:"titleDiv"},s.a.createElement("label",{id:"#titleLabel",className:"boldLabel"},"Survey title:"),s.a.createElement("input",{type:"text",name:"title",id:"titleInput",placeholder:"Survey Title",onChange:this.textChanged,required:!0})),s.a.createElement("div",{id:"descriptionDiv"},s.a.createElement("label",{id:"#descriptionLabel",className:"boldLabel"},"Description:"),s.a.createElement("input",{type:"text",name:"description",id:"descriptionInput",placeholder:"Description",onChange:this.textChanged,required:!0})),s.a.createElement("div",{className:"questionDiv"},s.a.createElement("a",{href:" ",onClick:this.addQuestion,className:"shrinkAnchorPlus"},s.a.createElement("i",{className:"far fa-plus-square fa-2x",id:"plusIcon"})),s.a.createElement("ul",{className:"questionList"},s.a.createElement(this.Question,null))),s.a.createElement("button",{type:"submit",className:"loginInput btn btn-dark"},"Save Survey"))))}}]),t}(n.Component)),j=(a(76),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).SurveyList=function(){return a.state.retrievedData?0===a.state.surveys.length?s.a.createElement("h1",null,"No surveys found!"):a.state.surveys.map(function(e,t){return s.a.createElement("li",{key:t,className:"buttonList"},s.a.createElement(p.b,{className:"survListButt btn btn-dark",to:"/preview/?id=".concat(e.id,"&user=").concat(a.props.username)},"Preview - ",e.title),s.a.createElement(p.b,{className:"statsButton btn btn-info",to:"/stats/?id=".concat(e.id)},"Stats"),s.a.createElement("button",{className:"deleteButtons btn btn-danger",onClick:a.deleteSurvey,btnid:e.id},"Delete"))}):s.a.createElement("h1",null,"Retrieving surveys...")},a.state={retrievedData:!1,surveys:[]},a.SurveyList=a.SurveyList.bind(Object(m.a)(a)),a.deleteSurvey=a.deleteSurvey.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.title="My Surveys";var t=localStorage.getItem("qs_auth_token");f.a.get("http://localhost:3001/survey/".concat(this.props.username),{headers:{Authorization:"Bearer ".concat(t)}}).then(function(t){return e.setState({retrievedData:!0,surveys:t.data})}).catch(function(e){return console.log(e)})}},{key:"deleteSurvey",value:function(e){var t=this,a=e.target.attributes.getNamedItem("btnid").value,n=localStorage.getItem("qs_auth_token");f.a.delete("http://localhost:3001/survey/delete/".concat(a),{headers:{Authorization:"Bearer ".concat(n)}}).then(function(e){var n=t.state.surveys.filter(function(e){return e.id!==Number(a)});t.setState({surveys:n},function(){console.log("Survey deleted")})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){return s.a.createElement("div",{className:"App-main"},s.a.createElement("h1",{id:"loginHeading"},"My Surveys"),s.a.createElement("ul",{className:"survey-list-main"},s.a.createElement(this.SurveyList,null)))}}]),t}(n.Component));var C=function(){return s.a.createElement("div",null,s.a.createElement("h1",null,"Page not found!"))},q=(a(33),a(37)),w=a.n(q),I=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={},a.section=a.section.bind(Object(m.a)(a)),a.CreateOptions=a.CreateOptions.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.title="View Survey";var t=new URLSearchParams(window.location.search),a=t.get("id"),n=t.get("user");f.a.get("http://localhost:3001/survey/".concat(n,"/").concat(a)).then(function(t){e.setState(t.data[0])}).catch(function(e){return console.log(e)})}},{key:"section",value:function(){var e=this;return this.state.title?this.state.questions.map(function(t,a){return s.a.createElement("div",{key:a,className:"surveySection"},s.a.createElement("h1",{className:"sectionTitle"},t.question),s.a.createElement("div",{className:"formSection"},s.a.createElement(e.CreateOptions,{sectionindex:a,type:t.quesType,question:t.question})))}):s.a.createElement("h1",null,"Loading...")}},{key:"CreateOptions",value:function(e){return this.state.questions[e.sectionindex].options.split(", ").map(function(t,a){return s.a.createElement("div",{className:"surveyDiv",key:e.sectionindex+a},s.a.createElement("label",{className:"surveyLabel"},t),s.a.createElement("input",{className:"surveyInput",type:e.type,name:e.question,value:t}))})}},{key:"formToJSON",value:function(e){e.preventDefault();var t={id:this.state.id,answers:w()("#surveyForm").serializeArray()};f.a.patch("http://localhost:3001/update/",t).then(function(e){console.log("Form submitted successfully"),document.getElementById("surveyForm").reset(),alert("Survey submitted successfully")}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){return s.a.createElement("div",{className:"App-main"},s.a.createElement("h1",{id:"title"},this.state.title),s.a.createElement("p",{id:"descript"},this.state.description),s.a.createElement("form",{onSubmit:this.formToJSON.bind(this),id:"surveyForm"},s.a.createElement(this.section,null),s.a.createElement("button",{type:"submit",id:"surveyButton",className:"btn btn-dark"},"Submit")))}}]),t}(n.Component),L=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={},a.section=a.section.bind(Object(m.a)(a)),a.CreateOptions=a.CreateOptions.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.title="Preview Survey";var t=new URLSearchParams(window.location.search),a=t.get("id"),n=t.get("user");f.a.get("http://localhost:3001/survey/".concat(n,"/").concat(a)).then(function(t){e.setState(t.data[0])}).catch(function(e){return console.log(e)})}},{key:"section",value:function(){var e=this;return this.state.title?this.state.questions.map(function(t,a){return s.a.createElement("div",{key:a,className:"surveySection"},s.a.createElement("h1",{className:"sectionTitle"},t.question),s.a.createElement("div",{className:"formSection"},s.a.createElement(e.CreateOptions,{sectionindex:a,type:t.quesType,question:t.question})))}):s.a.createElement("h1",null,"Loading...")}},{key:"CreateOptions",value:function(e){return this.state.questions[e.sectionindex].options.split(", ").map(function(t,a){return s.a.createElement("div",{className:"surveyDiv",key:e.sectionindex+a},s.a.createElement("label",{className:"surveyLabel"},t),s.a.createElement("input",{className:"surveyInput",type:e.type,disabled:!0}))})}},{key:"render",value:function(){return s.a.createElement("div",{className:"App-main"},s.a.createElement("h1",{id:"title"},this.state.title),s.a.createElement("p",{id:"descript"},this.state.description),s.a.createElement("form",{id:"surveyForm"},s.a.createElement(this.section,null),s.a.createElement("button",{id:"surveyButton",className:"btn btn-dark",disabled:!0},"Submit")))}}]),t}(n.Component),x=(a(77),[]),A={textAlign:"center",listStyle:"none",padding:0,margin:0},D=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={},a.MainBit=a.MainBit.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.title="Stats Page",x=[];var t=new URLSearchParams(window.location.search).get("id"),a=localStorage.getItem("qs_auth_token");f.a.get("http://localhost:3001/update/".concat(t),{headers:{Authorization:"Bearer ".concat(a)}}).then(function(t){return e.setState(t.data[0])}).catch(function(e){return console.log(e)})}},{key:"GenerateStats",value:function(e){return Object.keys(x[e.i].options).map(function(t,a){return s.a.createElement("div",{key:a},s.a.createElement("p",null,t,": ",x[e.i].options[t]))})}},{key:"MainBit",value:function(){var e=this;return Object.keys(this.state).filter(function(e){return!e.includes("id")&&!e.includes("__v")}).map(function(t){return x.push({question:t,options:e.state[t]})}),x.map(function(t,a){return s.a.createElement("li",{key:a},s.a.createElement("h1",null,t.question),s.a.createElement(e.GenerateStats,{i:a}))})}},{key:"render",value:function(){return s.a.createElement("div",{className:"App-main"},s.a.createElement("h1",null,"Survey Statistics"),s.a.createElement("ul",{style:A},s.a.createElement(this.MainBit,null)))}}]),t}(n.Component);function F(){localStorage.removeItem("qs_auth_token"),window.location.assign("http://localhost:3000/login")}var M=function(e){return e.logState.loggedIn?s.a.createElement("div",{className:"App-header-background"},s.a.createElement("div",{className:"App-header"},s.a.createElement("div",null,s.a.createElement("p",{className:"App-title"},"QuickSurvey")),s.a.createElement("nav",null,s.a.createElement("ul",{className:"App-nav"},s.a.createElement("li",null,s.a.createElement(p.b,{className:"link",to:"/"},"Surveys")),s.a.createElement("li",null,s.a.createElement(p.b,{className:"link",to:"/mysurveys"},"My Surveys")),s.a.createElement("li",null,s.a.createElement(p.b,{className:"link",to:"/create"},"Create Surveys")))),s.a.createElement("nav",null,s.a.createElement("ul",{className:"App-nav-login"},s.a.createElement("li",null,s.a.createElement("button",{className:"logoutButton",onClick:F},"Logout (",e.logState.username,")")))))):s.a.createElement("div",{className:"App-header-background"},s.a.createElement("div",{className:"App-header"},s.a.createElement("div",null,s.a.createElement("p",{className:"App-title"},"QuickSurvey")),s.a.createElement("nav",null,s.a.createElement("ul",{className:"App-nav"},s.a.createElement("li",null,s.a.createElement(p.b,{className:"link",to:"/"},"Surveys")),s.a.createElement("li",null,s.a.createElement(p.b,{className:"link",to:"/mysurveys"},"My Surveys")),s.a.createElement("li",null,s.a.createElement(p.b,{className:"link",to:"/create"},"Create Surveys")))),s.a.createElement("nav",null,s.a.createElement("ul",{className:"App-nav-login"},s.a.createElement("li",null,s.a.createElement(p.b,{className:"link",to:"/login"},"Login")),s.a.createElement("li",{className:"signupLi"},s.a.createElement(p.b,{className:"link",to:"/signup"},"Signup"))))))},B=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).setLogInState=function(e,t){console.log("Setting log in state"),a.setState({status:{loggedIn:e,username:t}})},a.state={status:{loggedIn:!1,username:""}},a.setLogInState=a.setLogInState.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.verifyToken();e?this.setLogInState(!0,e):console.log("No valid log in token")}},{key:"verifyToken",value:function(){var e=localStorage.getItem("qs_auth_token");if(e){var t=g()(e);return t.exp>Date.now()/1e3&&t.username}return!1}},{key:"render",value:function(){var e=this;return s.a.createElement(p.a,null,s.a.createElement("div",{className:"App"},s.a.createElement(M,{logState:this.state.status}),s.a.createElement(v.d,null,s.a.createElement(v.b,{path:"/",exact:!0,component:N}),s.a.createElement(v.b,{path:"/mysurveys",render:function(t){return e.state.status.loggedIn?s.a.createElement(j,Object.assign({username:e.state.status.username},t)):s.a.createElement(v.a,{to:"/login"})}}),s.a.createElement(v.b,{path:"/create",render:function(t){return e.state.status.loggedIn?s.a.createElement(k,Object.assign({username:e.state.status.username},t)):s.a.createElement(v.a,{to:"/login"})}}),s.a.createElement(v.b,{path:"/viewsurvey",render:function(t){return s.a.createElement(I,Object.assign({username:e.state.status.username},t))}})," ",s.a.createElement(v.b,{path:"/preview",render:function(t){return e.state.status.loggedIn?s.a.createElement(L,Object.assign({username:e.state.status.username},t)):s.a.createElement(v.a,{to:"/login"})}})," ",s.a.createElement(v.b,{path:"/stats",render:function(t){return e.state.status.loggedIn?s.a.createElement(D,Object.assign({username:e.state.status.username},t)):s.a.createElement(v.a,{to:"/login"})}})," ",s.a.createElement(v.b,{path:"/signup",render:function(e){return s.a.createElement(E,e)}})," ",s.a.createElement(v.b,{path:"/login",render:function(t){return s.a.createElement(S,Object.assign({setLogInState:e.setLogInState},t))}}),s.a.createElement(v.b,{path:"*",component:C})," ")))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[38,1,2]]]);
//# sourceMappingURL=main.b7528774.chunk.js.map