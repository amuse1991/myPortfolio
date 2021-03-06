import React, {Component} from 'react'
import { Card, CardImg, CardText, CardBody, CardDeck, CardGroup, CardColumns, CardTitle, Button,  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col,Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import classnames from 'classnames'
import '../../../static/css/skills.css'

export default class SkillTabs extends Component{
    
    // props : skills(Skills.js)
    constructor(props) {
    
        super(props)
    
        this.dataSet = this.props.skills
    
        this.pageSize = 6; // 페이지당 최대 아이템 개수
        this.pagesCount = Math.ceil(this.dataSet.length / this.pageSize); //총 페이지 개수
        this.rowSize = Math.ceil(this.pageSize/2) // 한 Row 당 최대 아이템 개수
    
        this.state = {
            currentPage: 0
        };
        
    }

    handleClick(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });

    }
         
    getCardColor = (level)=>{
        switch(level){
            case 3:
                return "primary"
            case 2:
                return "info"
            case 1:
                return "warning"
        }
    }

    makeCard = (cardData, color)=>{
        if(color==undefined){
            color = "primary"
        }

        const imageContext = require.context('../../../../public/icons', true);
        let imageSrc = imageContext(`./${cardData.imgName}`)

        return(
            <Card body outline className="text-center skill-card" color={color} >
                {/* 이미지가 정상적으로 로드된 경우에만 이미지 표시 */}
                {imageSrc==undefined?null:<CardImg top src={imageSrc}/>} 
                <CardTitle className="skill-card-title">{cardData.title}</CardTitle>
                {cardData.description.map((descItem)=>
                    descItem==undefined?null:<CardText className="skill-card-text">{descItem}</CardText>
                )}
            </Card>
        )
    }

    render(){
        const { currentPage } = this.state;
        
        return(
            <React.Fragment>
                {/* 페이지 수가 1개 이하일 경우 visibility:hidden */}
                <div className="pagination-wrapper" style={this.pagesCount<=1?{visibility:"hidden"}:{visibility:"visible"}}> 
                    <Pagination size="sm" aria-label="Page navigation" className="skills-pagination">
                        {/* prev */}
                        <PaginationItem disabled={currentPage <= 0}>
                        <PaginationLink
                            onClick={e => this.handleClick(e, currentPage - 1)}
                            previous
                            href="#"
                        />
                        </PaginationItem>

                        {/* 번호 */}
                        {[...Array(this.pagesCount)].map((page, i) => 
                        <PaginationItem active={i === currentPage} key={i}>
                            <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                            {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                        )}

                        {/* next */}
                        <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                            <PaginationLink
                                onClick={e => this.handleClick(e, currentPage + 1)}
                                next
                                href="#"
                            />
                        </PaginationItem>
                    </Pagination>
                </div>


                {/* <Row flex="true">
                    {this.dataSet
                        .slice(
                            currentPage * this.pageSize,
                            (currentPage + 1) * this.pageSize
                        )
                        .map((data, i) =>
                                <Col md="3" className="card-col">{this.makeCard(data,this.getCardColor(data.level))}</Col>
                                
                        )}
                </Row> */}
                <CardDeck className="skill-card-deck">
                    {this.dataSet
                        .slice(
                            currentPage * this.pageSize,
                            (currentPage + 1) * this.pageSize
                        )
                        .map((data, i) =>
                                this.makeCard(data,this.getCardColor(data.level))
                                
                        )}
                </CardDeck>    
                
                
                
                
            </React.Fragment>
        )
    }
}