#include<bits/stdc++.h>

using namespace std;

// check if it is a valid IP address
// a.b.c.d and each of these will be in the range of 0-255

bool recur(string& s, int start, int dotsLeft) {

    // base case

//    cout<<start<<' '<<dotsLeft<<'\n';

    if(start==s.size() && dotsLeft==0) {
        return true;
    }
    // #########
    if(start>s.size() || dotsLeft<0) return false;

    bool flag = false;
    for(int i=start; i<start+3; i++) {

        string t = s.substr(start, i-start+1);
        int n = stoi(t);

        if(i>start && t[start]=='0') continue;
        if(n>=0 && n<=255) {
            flag = recur(s, i+1, dotsLeft)-1)|| flag; //recur(s, start, dotsLeft);
        }

    }

    return flag;

}
bool check(string& s) {

    for(int i=0; i<s.size(); i++) {
        if(!(s[i]>='0' && s[i]<='9')) return false;
    }
    return true;
}

/*

#############
state -> index, dots left -> 0, 3
dp[i][j] = dp[i+1][j-1]||dp[i+1][j]

for dp[i][0] = true if string from i to the end is between 0-255
for dp[0][j] = false (empty string so false)

dp[0][3]

*/

bool solve1(string& s) {

    // contain only digits
    // 255.255.255.255 -> max size of string should be 12
    if(s.size()>12 || !check(s)) {
        return false;
    }
    return recur(s, 0, 3);
}

bool solve(string& s) {

    stringstream ss(s);
    string temp = "";

    // 192.0.123.12
    int cnt = 0;
    while(getline(ss, temp, '.')) {

        // check stoi output if temp is not int
        cnt++;

        int num;
        try {
            num = stoi(temp);
        } catch (exception e) {
            cout<<e.what()<<' ';
            return false;
        }

        if(!(num>=0 && num<=255) || (temp.size()>1 && temp[0]=='0')) return false;

    }

    return cnt==4;

}
int main() {

    string s;

    while(1) {
        cin>>s;
        cout<<solve1(s)<<'\n';
    }

//    while(1) {
//        cin>>s;
//        if(solve(s)) cout<<"Yes"<<'\n';
//        else cout<<"No"<<'\n';
//    }
//
//    try {
//        cout<<stoi("asbh123")<<'\n';
//    } catch (exception e) {
//        cout<<e.what();
//    }



    return 0;
}
