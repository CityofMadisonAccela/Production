//#########################################Mimic Calling methods start.################################################
// Calling from event.
sendEmailByModel(getTitle(), getContent());
// Hard coded title and content.
sendEmailByModel('Mimic Title', 'Mimic Content');
sendEmailByModelWithNoDisplayName('Mimic Title', 'Mimic Content');
sendMessageByTemplate();
resendFailed();
associate(); // Hard Coded.
sendSMSByModel('Mimic Content')
sendSMSByModelWithNoDisplayName('Mimic Content');

sendEmailAndAssociate(); // Go to the method to modify variables.
sendSMSAndAssociate(); // Go to the method to modify variables.
sendByTemplateAndAssociate(); // Go to the method to modify variables.
associateCapAfterRecievingEmail() // Parse altId from content, and associate with current email.

aa.env.setValue("ScriptReturnCode","0");
aa.env.setValue("ScriptReturnMessage",'The output below:');
//##########################################Mimic Calling methods end###############################################


// ####################################Supported methods start.##############################
function sendMessageByMessageModel(messageModel){
	return aa.communication.sendMessage(messageModel);
}

function sendMessageByNotificationTemplate(templateName, variables, triggerEvent){
	return aa.communication.sendMessages(templateName, variables, triggerEvent);
}

function associateEnities(communicationId, entityId, entityType){
	return aa.communication.associateEnities(communicationId, entityId, entityType);
}

function getEmailMessageScriptModel(){
	return aa.communication.getEmailMessageScriptModel();
}

function getSMSMessageScriptModel(){
	return aa.communication.getSMSMessageScriptModel();
}

function getContactList4Email(params){
	return aa.communication.getContactList(params, 'EMAIL');
}

function getContactList4SMS(params){
	return aa.communication.getContactList(params, 'SMS');
}

function resendFailedMessages(typeArray){
	return aa.communication.resendFailedMessages(typeArray);
}

function getI18nVariables(){
	return aa.communication.getI18nVariables();
}
// ####################################Supported methods end.###################################





// ####################################Util methods start.#######################################
// Get custom Id.
function getCapAltId()
{
	return getAltId();
}

// Get Current Alt Id.
function getAltId(){
	var capId = getCapId();
	if(capId){
		var altId = capId.getCustomID();
		aa.print('AltId: ' + altId);
	
		return altId;
	}
}

// Get Current Cap Id
function getCapId()  {

    var s_id1 = aa.env.getValue("PermitId1");
    var s_id2 = aa.env.getValue("PermitId2");
    var s_id3 = aa.env.getValue("PermitId3");

    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);
    if(s_capResult.getSuccess())
      return s_capResult.getOutput();
    else
    {
      logMessage("ERROR: Failed to get capId: " + s_capResult.getErrorMessage());
      return null;
    }
}

// log meesage.
function logMessage(msg){
	aa.print("MESSAGE: " + msg);
}

// Log error.
function logError(errorMsg){
	aa.print("ERROR: " + errorMsg);
}

// ####################################Util methods end.#########################################

//####################################Example of what could be done start.#############################################################
function sendEmailByModel(pTitle, pContent){

	// Form contacts.
	function formContacts(){
		// Define some constants used in params.
		var from = 'FROM',
			to = 'TO',
			bcc = 'BCC',
			cc = 'CC';
		
		
		// Build to contacts.
		// This params is used for building contacts.
		// It is a two dimensional array, with each item being the contanct to be specified.
		// In each contact item, the configuration will be something similar to [contact name string, contact email string, contact type string].
		// Note that in the contact type string only string defined above could be used, which are "FROM", "TO", "BCC" and "CC".
		var params = [
						['Tom Liang', '****@*****', to], 
						['Bruin li', '****@*****', to], 
						['Austin wang', '****@*****', to],
						['Bruin Li', '****@*****', from]
					];
		var contacts = getContactList4Email(params).getOutput();
		
		return contacts;
	}
	
	// sending message starts.+++++++++++++++++++++++++++++++++++++++++++++++++++++++
	var messageModel = getEmailMessageScriptModel().getOutput();

	// Set title and content.
	var title = pTitle+'[from script]';
	messageModel.setTitle(title);

	var content = pContent+'[from script].';
	messageModel.setContent(content);

	var contacts = formContacts();
	messageModel.setContacts(contacts);

	// Set the parameter with appropriate event type, which could not be one of those listed below.
	// (CommunicationReceivingEmailBefore,CommunicationReceivingEmailAfter,CommunicationSendingEmailBefore,CommunicationSendingEmailAfter;);
	messageModel.setTriggerEvent('From EMSE script');

	// Call the api to sent message.
	var result = sendMessageByMessageModel(messageModel);
	aa.print((result.getOutput() != null)?'email sent successfully.': 'email sent failed.');
	
	return result.getOutput();
}

function sendEmailByModelWithNoDisplayName(pTitle, pContent){

	// Form contacts.
	function formContacts(){
		// Define some constants used in params.
		var from = 'FROM',
			to = 'TO',
			bcc = 'BCC',
			cc = 'CC';
		
		
		// Build to contacts.
		// This params is used for building contacts.
		// It is a two dimensional array, with each item being the contanct to be specified.
		// In each contact item, the configuration will be something similar to [contact email string, contact type string].
		// Note that in the contact type string only string defined above could be used, which are "FROM", "TO", "BCC" and "CC".
		var params = [
						['****@*****', to], 
						['****@*****', to], 
						['****@*****', to],
						['****@****', from]
					];
		var contacts = getContactList4Email(params).getOutput();
		
		return contacts;
	}
	
	// sending message starts.+++++++++++++++++++++++++++++++++++++++++++++++++++++++
	var messageModel = getEmailMessageScriptModel().getOutput();

	// Set title and content.
	var title = pTitle+'[from script]';
	messageModel.setTitle(title);

	var content = pContent+'[from script].';
	messageModel.setContent(content);

	var contacts = formContacts();
	messageModel.setContacts(contacts);

	// Set the parameter with appropriate event type, which could not be one of those listed below.
	// (CommunicationReceivingEmailBefore,CommunicationReceivingEmailAfter,CommunicationSendingEmailBefore,CommunicationSendingEmailAfter;);
	messageModel.setTriggerEvent('From EMSE script');

	// Call the api to sent message.
	var result = sendMessageByMessageModel(messageModel);
	aa.print((result.getOutput() != null)?'email sent successfully.': 'email sent failed.');
	
	return result.getOutput();
}


function sendSMSByModel(pContent){

	// Form contacts.
	function formContacts(){
		// Define some constants used in params.
		var from = 'FROM',
			to = 'TO';
		
		
		// Build to contacts.
		// This params is used for building contacts.
		// It is a two dimensional array, with each item being the contanct to be specified.
		// In each contact item, the configuration will be something similar to [contact name string, contact phone number string, contact type string].
		// Note that in the contact type string only string defined above could be used, which are "FROM", "TO";
		var params = [
						['User A', '13681281429', to],
						['User B', '18675528275', from]
					];
		var contacts = getContactList4SMS(params).getOutput();
		
		return contacts;
	}
	
	// sending message starts.+++++++++++++++++++++++++++++++++++++++++++++++++++++++
	var messageModel = getSMSMessageScriptModel().getOutput();

	// Set content.
	var content = pContent+'[from script].';
	messageModel.setContent(content);

	var contacts = formContacts();
	messageModel.setContacts(contacts);

	// Set the parameter with appropriate event type, which could be one of those listed below.
	// (CommunicationReceivingEmailBefore,CommunicationReceivingEmailAfter,CommunicationSendingEmailBefore,CommunicationSendingEmailAfter;);
	messageModel.setTriggerEvent('CommunicationReceivingEmailAfter');

	// Call the api to sent message.
	var result = sendMessageByMessageModel(messageModel);
	aa.print((result.getOutput() != null)?'SMS sent successfully.': 'SMS sent failed.');
	
	return result.getOutput();
}

function sendSMSByModelWithNoDisplayName(pContent){

	// Form contacts.
	function formContacts(){
		// Define some constants used in params.
		var from = 'FROM',
			to = 'TO';
		
		
		// Build to contacts.
		// This params is used for building contacts.
		// It is a two dimensional array, with each item being the contanct to be specified.
		// In each contact item, the configuration will be something similar to [contact phone number string, contact type string].
		// Note that in the contact type string only string defined above could be used, which are "FROM", "TO";
		var params = [
						['13681281429', to],
						['18675528275', from]
					];
		var contacts = getContactList4SMS(params).getOutput();
		
		return contacts;
	}
	
	// sending message starts.+++++++++++++++++++++++++++++++++++++++++++++++++++++++
	var messageModel = getSMSMessageScriptModel().getOutput();

	// Set content.
	var content = pContent+'[from script].';
	messageModel.setContent(content);

	var contacts = formContacts();
	messageModel.setContacts(contacts);

	// Set the parameter with appropriate event type, which could not be one of those listed below.
	// (CommunicationReceivingEmailBefore,CommunicationReceivingEmailAfter,CommunicationSendingEmailBefore,CommunicationSendingEmailAfter;);
	messageModel.setTriggerEvent('From EMSE script');

	// Call the api to sent message.
	var result = sendMessageByMessageModel(messageModel);
	aa.print((result.getOutput() != null)?'SMS sent successfully.': 'SMS sent failed.');
	
	return result.getOutput();
}

function sendMessageByTemplate(){
	// The third parameter could be the correpsonding template name.
	var result = sendMessageByNotificationTemplate('EMAIL_TOM_TEST', null, 'EMAIL_TOM_TEST');
	aa.print(result.getOutput()?'message sent successfully':'error in sending message.');
}

function resendFailed(){
	// Alternatively, the combination of EMAIL, SMS, MEETING could be used.
	// so the params could be but not limited to what are listed below.
	// var params = ['SMS'];
	// var params = ['MEETING'];
	// var params = ['SMS', 'EMAIL'];
	var params = ['EMAIL'];
	resendFailedMessages(params);
}

function sendEmailAndAssociate(){
	var cmId = sendEmailByModelWithNoDisplayName('Test Title', 'Test content');
	var altId = getCapAltId();
	
	if(cmdId && altId){
		aa.communication.associateEnities(cmId, altId, 'RECORD');
	}
}

function sendSMSAndAssociate(){
	var cmId = sendSMSByModelWithNoDisplayName('Test content');
	var altId = getCapAltId();
	
	if(cmdId && altId){
		aa.communication.associateEnities(cmId, altId, 'RECORD');
	}
}

function sendByTemplateAndAssociate(){
	var result = sendMessageByNotificationTemplate('EMAIL_TOM_TEST', null, 'EMAIL_TOM_TEST', [getCapAltId(), 'RECORD']);
	aa.print(result.getOutput()?'message sent successfully':'error in sending message.');
}

function associate(){
	// Mock content.
	// The content can be retrieved via the call to aa.env.getValue('content');
	// Or, any other exposed parameters could be used, from which the association will start.
	// Please notice the form of the string, which are something similiar to [communicationId:<entityId1,entityType1,entityId2,entityType2>]
	// In the "<", ">" any number of entities could be given.
	var content = '[329:<12CAP-00004759,RECORD;13CAP-00000136,RECORD>]'; 
	var rcmId = /^\s*\[\s*(\d{1,})\s*:/;
	var rEntity = /\s*<(.*)>\s*/g;
	var SEPERATOR_ENTITY = ',';
	var SEPERATOR_ENTITIES = ';';

	// Real execution.
	associateEntities(content);


	//**********************************functions def starts.***************************************
	// Get communication Id.
	function parseCmId(content){	
		var result = rcmId.exec(content);
		if(result && result[1]){
			return result[1];
		}
	}

	// Get Entities.
	function parseEntities(content){
		var result = rEntity.exec(content);
		if(result != null) {
			var matched = result[1];
			if(matched.indexOf(SEPERATOR_ENTITIES)){
				return entities = matched.split(SEPERATOR_ENTITIES);
			}
		}
	}

	// Associate the entities.
	function associateEntities(content){
		var cmId = parseCmId(content);
		aa.print(cmId);
		var entities = parseEntities(content) || [];
		aa.print(entities);
		
		var i = 0;
		var l = entities.length;
		var entityId; 
		var	entityType;
		var	entity;
		var	parts;
		while(i < l){
			entity = entities[i];
			if(entity){
				if(entity.indexOf(SEPERATOR_ENTITY)){
				parts = entity.split(SEPERATOR_ENTITY);
				entityId = parts[0];
				entityType = parts[1];
			}
			aa.communication.associateEnities(cmId, entityId, entityType);
			i++;
			}
		}
	}
}

//#########################################Example of what could be done end.########################################################

// ##########################################Retrieving environment variables start######################################################
function getTitle(){
	return aa.env.getValue('Title');
}
function getContent(){
	return aa.env.getValue('Content');
}
function getCc(){
	return aa.env.getValue('Cc');
}
function getBcc(){
	return aa.env.getValue('Bcc');
}
function getTo(){
	return aa.env.getValue('To');
}
function getFrom(){
	return aa.env.getValue('From');
}
function getComments(){
	return aa.env.getValue('Comments');
}
function getCommunicationId(){
	return aa.env.getValue('CommunicationId');
}
// ############################################Retrieving environment variables end####################################################