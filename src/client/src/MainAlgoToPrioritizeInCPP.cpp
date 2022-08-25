#include <bits/stdc++.h>


typedef long long ll;


using namespace std;

#define mod 1000000007

double weight = 5.0;
struct caseDetails {
	string caseNumber;
	int statusOfAccused;   // 3 -> Jail, 2-> On Run, 1-> Bail
	int countOfSection;
	vector<string>sectionInvolved;
	ll lastHearingDate;
	ll chargeSheetDate;
	int imprisonment;
	int bailable;
	double total;
};

double scaleValue(double value, double mxAllow, double mnAllow, double mx, double mn) {

	return  (((mxAllow - mnAllow) * (value - mn)) / max((mx - mn), 1.0)) + mnAllow;
}

bool compareTwoCases(caseDetails a, caseDetails b) {
	if (a.total != b.total)
		return a.total > b.total;

	if (a.chargeSheetDate != b.chargeSheetDate)
		return a.chargeSheetDate < b.chargeSheetDate;

	return a.caseNumber  < b.caseNumber;
}

int main () {



	ios_base::sync_with_stdio(false);
	cin.tie(NULL);

	map<string, int>isBailable = {{"300", 1}, {"304A", 0}, {"304B", 1}, {"305", 1}, {"306", 1}, {"311", 1}, {"312", 0}, {"313", 1}, {"314", 1}, {"315", 1}, {"316", 1}, {"317", 0}, {"318", 0}, {"323", 0}, {"324", 1}, {"325", 0}, {"326", 1}, {"327", 1}, {"328", 1}, {"329", 1}, {"330", 0}, {"332", 1}, {"333", 1}, {"334", 0}, {"335", 0}, {"336", 0}, {"337", 0}, {"338", 0}, {"341", 0}, {"342", 0}, {"343", 0}, {"345", 0}, {"346", 0}, {"347", 0}, {"352", 0}, {"353", 1}, {"354", 1}, {"354D", 0}, {"355", 0}, {"356", 0}, {"358", 0}, {"363", 0}, {"366A", 1}, {"366B", 1}, {"369", 1}, {"371", 1}, {"372", 1}, {"401", 1}, {"402", 1}, {"403", 0}, {"406", 1}, {"409", 1}, {"411", 1}, {"412", 1}, {"413", 1}, {"417", 0}, {"419", 0}, {"421", 0}, {"423", 0}, {"426", 0}, {"427", 0}, {"430", 0}, {"431", 0}, {"434", 0}, {"435", 0}, {"439", 1}, {"447", 0}, {"448", 0}, {"449", 1}, {"453", 1}, {"456", 1}, {"459", 1}, {"461", 1}, {"465", 0}, {"466", 1}, {"468", 1}, {"475", 0}};
	// no. of months, bailable-0, death - 100yr, life imprisonment -  50 year
	map<string, int>sectionValue = {{"300", 1200}, {"304A", 24}, {"304B", 84}, {"305", 600}, {"306", 120}, {"311", 600}, {"312", 36}, {"313", 120}, {"314", 120}, {"315", 120}, {"316", 120}, {"317", 84}, {"318", 24}, {"323", 12}, {"324", 36}, {"325", 84}, {"326", 600}, {"327", 120}, {"328", 120}, {"329", 120}, {"330", 84}, {"332", 36}, {"333", 120}, {"334", 1}, {"335", 48}, {"336", 3}, {"337", 6}, {"338", 24}, {"341", 1}, {"342", 12}, {"343", 24}, {"345", 24}, {"346", 24}, {"347", 36}, {"352", 3}, {"353", 24}, {"354", 60}, {"354D", 36}, {"355", 24}, {"356", 24}, {"358", 1}, {"363", 84}, {"366A", 120}, {"366B", 120}, {"369", 84}, {"371", 600}, {"372", 120}, {"401", 84}, {"402", 84}, {"403", 24}, {"406", 36}, {"409", 600}, {"411", 36}, {"412", 600}, {"413", 600}, {"417", 12}, {"419", 36}, {"421", 24}, {"423", 24}, {"426", 36}, {"427", 24}, {"430", 60}, {"431", 60}, {"434", 12}, {"435", 84}, {"439", 120}, {"447", 3}, {"448", 12}, {"449", 600}, {"453", 24}, {"456", 36}, {"459", 600}, {"461", 24}, {"465", 24}, {"466", 84}, {"468", 84}, {"475", 600}};
	int numberOfCases;
	cin >> numberOfCases;

	caseDetails caseDetail[numberOfCases];
	int mx = -1, mn = INT_MAX;
	ll mxDate = -1, mnDate = INT_MAX;

	for (ll i = 0; i < numberOfCases; i++) {
		cin >> caseDetail[i].caseNumber >> caseDetail[i].statusOfAccused >> caseDetail[i].chargeSheetDate >> caseDetail[i].countOfSection;

		int z = 0, z2 = 0;
		for (int j = 0; j < caseDetail[i].countOfSection; j++) {
			string st;
			cin >> st;
			caseDetail[i].sectionInvolved.push_back(st);
			z += sectionValue[st];

		}
		mx = max(mx, z);
		mn = min(mn, z);
		cin >> caseDetail[i].lastHearingDate;
		mxDate = max(mxDate, caseDetail[i].lastHearingDate);
		mnDate = min(mnDate, caseDetail[i].lastHearingDate);

	}

	for (ll i = 0; i < numberOfCases; i++) {
		double all = 0.0;
		all += double(weight / (max(scaleValue(caseDetail[i].lastHearingDate, 100, 1, mxDate, mnDate), 1.0) * (weight - 1)));

		all += (double)(scaleValue(caseDetail[i].statusOfAccused, 100, 1, 3, 1)) * (weight - 1.0);
		int sectionTotal = 0;
		int bail = 0;
		for (int j = 0; j < caseDetail[i].countOfSection; j++) {
			sectionTotal += sectionValue[caseDetail[i].sectionInvolved[j]];
			bail = (bail | isBailable[caseDetail[i].sectionInvolved[j]]);
		}

		all += (double) (scaleValue(sectionTotal, 100, 1, mx, max(mn, 1)) * (weight));
		all += (double)(scaleValue(bail, 100, 1, 2, 1) * (weight - 3.0));
		caseDetail[i].total = (all) / 15.0;
	}
	//int bandwidth = 5, day = 1;
	sort(caseDetail, caseDetail + numberOfCases, compareTwoCases);

	for (int i = 0; i < numberOfCases; i++) {
		//if (i % bandwidth == 0) cout << "\nDay " << day++ << "\n\n";
		cout << caseDetail[i].caseNumber << "\n";
	}

}

/*
Number Of cases
caseId statusOfAccused ChargesheetDate countOfSection
section1 section2 ..... lastHearingDate
*/